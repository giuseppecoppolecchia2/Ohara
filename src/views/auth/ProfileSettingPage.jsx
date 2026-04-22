import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import routes from "../../routing/routes";
import { supabase } from "../../database/supabase";
import { FaUser, FaAt, FaImage, FaArrowLeft } from "react-icons/fa";

export default function ProfileSettingPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { profile, getUser, updateProfile, avatarUrl } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      first_name: profile?.first_name,
      last_name: profile?.last_name,
      username: profile?.username,
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [file]);

  const onSubmit = async (data) => {
    await updateProfile(data);
    navigate(routes.profile);
  };

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${profile.id}-${Date.now()}.${fileExt}`;
      await supabase.storage.from("avatars").upload(fileName, file);
      await supabase.from("profiles").update({ avatar_url: fileName }).eq('id', profile.id);
      await getUser();
      setFile(null);
    } catch (error) {
      console.error("Errore caricamento:", error);
    } finally {
      setUploading(false);
    }
  };

  if (!profile) return null;

  return (
    <main className="min-h-screen flex justify-center py-10 px-4">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        
        {/* Header con pulsante torna indietro */}
        <div className="flex items-center gap-4">
            <button 
                onClick={() => navigate(routes.profile)}
                className="p-3 rounded-full bg-[#0a1f2b]/80 border border-[#e8d8b5]/40 text-[#e8d8b5] hover:bg-[#b48f40] hover:text-[#0a1f2b] transition"
            >
                <FaArrowLeft />
            </button>
            <h1 className="text-3xl font-bold text-[#e8d8b5]">Impostazioni Profilo</h1>
        </div>

        {/* Sezione Foto Profilo */}
        <div className="bg-[#0a1f2b]/80 backdrop-blur-sm border border-[#e8d8b5]/40 rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-6 text-[#e8d8b5] flex items-center gap-2">
            <FaImage className="opacity-70" /> Foto profilo
          </h2>
          <form onSubmit={handleAvatarSubmit} className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <img
                src={preview || avatarUrl || "https://picsum.photos/200"}
                alt="Preview"
                className="w-32 h-32 rounded-full border-4 border-[#e8d8b5]/40 object-cover shadow-md"
              />
              {uploading && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <span className="loading loading-spinner text-[#e8d8b5]"></span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 flex-1 w-full">
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full bg-[#0f2a3a]/70 border-[#e8d8b5]/40 text-[#e8d8b5] focus:outline-none"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <p className="text-xs text-[#e8d8b5]/50">Formati supportati: PNG, JPG (Max 2MB)</p>
              {file && (
                <button 
                    type="submit" 
                    className="bg-[#b48f40] text-[#0a1f2b] px-6 py-2 rounded-xl font-bold hover:opacity-90 transition disabled:opacity-50"
                    disabled={uploading}
                >
                  {uploading ? "Caricamento..." : "Aggiorna Avatar"}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Sezione Dati Personali */}
        <div className="bg-[#0a1f2b]/80 backdrop-blur-sm border border-[#e8d8b5]/40 rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-6 text-[#e8d8b5] flex items-center gap-2">
            <FaUser className="opacity-70" /> Informazioni Personali
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label text-[#e8d8b5]/70 text-sm">Nome</label>
                <input
                  {...register("first_name", { required: "Inserisci il tuo nome" })}
                  type="text"
                  className="input bg-[#0f2a3a]/70 border-[#e8d8b5]/40 text-[#e8d8b5] focus:border-[#b48f40] focus:outline-none"
                />
                {errors.first_name && <p className="text-red-400 text-xs mt-1">{errors.first_name.message}</p>}
              </div>

              <div className="form-control">
                <label className="label text-[#e8d8b5]/70 text-sm">Cognome</label>
                <input
                  {...register("last_name", { required: "Inserisci il tuo cognome" })}
                  type="text"
                  className="input bg-[#0f2a3a]/70 border-[#e8d8b5]/40 text-[#e8d8b5] focus:border-[#b48f40] focus:outline-none"
                />
                {errors.last_name && <p className="text-red-400 text-xs mt-1">{errors.last_name.message}</p>}
              </div>
            </div>

            <div className="form-control">
              <label className="label text-[#e8d8b5]/70 text-sm">Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-[#e8d8b5]/40">
                    <FaAt />
                </span>
                <input
                    {...register("username", { required: "L'username è obbligatorio" })}
                    type="text"
                    className="input w-full pl-10 bg-[#0f2a3a]/70 border-[#e8d8b5]/40 text-[#e8d8b5] focus:border-[#b48f40] focus:outline-none"
                />
              </div>
              {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>}
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button 
                type="button" 
                className="px-6 py-2 rounded-xl text-[#e8d8b5] hover:bg-white/5 transition"
                onClick={() => navigate(routes.profile)}
              >
                Annulla
              </button>
              <button 
                type="submit" 
                className="bg-[#b48f40] text-[#0a1f2b] px-8 py-2 rounded-xl font-bold hover:opacity-90 transition shadow-md"
              >
                Salva Modifiche
              </button>
            </div>
          </form>
        </div>

      </div>
    </main>
  );
}