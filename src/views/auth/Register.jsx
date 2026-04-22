import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { supabase } from "../../database/supabase";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Logo from "../../components/Logo";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUp } = useContext(UserContext);
  const redirect = useNavigate();

  const onSubmit = async (user_data) => {
    await signUp({
      email: user_data.email,
      password: user_data.password,
      options: {
        data: {
          first_name: user_data.first_name,
          last_name: user_data.last_name,
          username: user_data.username,
        },
      },
    });
    redirect("/");
  };

  return (
    <main className="min-h-screen flex flex-col justify-start items-center gap-3">
      <div className="absolute w-[500px] h-[500px] bg-[#c9a227]/10 blur-3xl rounded-full" />

      
        <Logo className="w-60" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-[#0f2a3a]/70 backdrop-blur-sm rounded-2xl border border-[#e8d8b5]/50 shadow-sm p-10 text-[#e8d8b5]/80"
      >
        <h1 className="text-2xl font-medium mb-1 text-center">
          Crea un account
        </h1>
        <p className="  mb-8 text-center text-xs">
          Compila tutti i campi per registrarti.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-sm font-medium  mb-1.5">Nome</label>
            <input
              type="text"
              placeholder="Mario"
              className="input input-md w-full"
              {...register("first_name", { required: "Campo obbligatorio" })}
            />
            {errors.first_name && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.first_name.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1.5">Cognome</label>
            <input
              type="text"
              placeholder="Rossi"
              className="input input-md w-full"
              {...register("last_name", { required: "Campo obbligatorio" })}
            />
            {errors.last_name && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.last_name.message}
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium  mb-1.5">Username</label>
          <input
            type="text"
            placeholder="mariorossi"
            className="input input-md w-full"
            {...register("username", { required: "Campo obbligatorio" })}
          />
          {errors.username && (
            <span className="text-red-500 text-xs mt-1 block">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium  mb-1.5">Email</label>
          <input
            type="email"
            placeholder="mario@esempio.it"
            className="input input-md w-full"
            {...register("email", { required: "Campo obbligatorio" })}
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1 block">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium  mb-1.5">Password</label>
          <input
            type="password"
            placeholder="Almeno 8 caratteri"
            className="input input-md w-full"
            {...register("password", {
              required: "Campo obbligatorio",
              minLength: { value: 8, message: "Minimo 8 caratteri" },
            })}
          />
          {errors.password ? (
            <span className="text-red-500 text-xs mt-1 block">
              {errors.password.message}
            </span>
          ) : (
            <span className="text-gray-500 text-xs mt-1 block">
              Minimo 8 caratteri.
            </span>
          )}
        </div>

        <button
          type="submit"
          className="btn bg-[#a68847]/90  hover:text-[#0f2a3a] hover:scale-101 transition-all duration-200 w-full"
        >
          Registrati
        </button>

        <p className="text-center text-sm  mt-5">
          Hai già un account?{" "}
          <a href="/login" className="text-white underline">
            Accedi
          </a>
        </p>
      </form>
    </main>
  );
}
