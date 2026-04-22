import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import routes from "../../routing/routes";
import Logo from "../../components/Logo";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirect = useNavigate();
  const { login } = useContext(UserContext);

  const onSubmit = async (user_data) => {
    await login({
      email: user_data.email,
      password: user_data.password,
    });
    redirect("/");
  };

  return (
    <main className="min-h-screen flex flex-col justify-start items-center gap-3 px-4">
      <Logo className="w-40 sm:w-60" />
      <div className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-[#c9a227]/10 blur-3xl rounded-full" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-[#0f2a3a]/70 backdrop-blur-sm rounded-2xl border border-[#e8d8b5]/50 shadow-sm p-6 sm:p-10 text-[#e8d8b5]/80"
      >
        <h1 className="text-2xl font-medium mb-1 text-center">
          Bentornato
        </h1>
        <p className="mb-8 text-center text-xs">
          Accedi al tuo account.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1.5">
            Email
          </label>
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

        <div className="mb-6">
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-sm font-medium">
              Password
            </label>
            <Link
              to={routes.forgotPassword}
              className="text-xs text-[#e8d8b5]/70 underline hover:text-white"
            >
              Password dimenticata?
            </Link>
          </div>

          <input
            type="password"
            placeholder="••••••••"
            className="input input-md w-full"
            {...register("password", {
              required: "Campo obbligatorio",
              minLength: { value: 8, message: "Minimo 8 caratteri" },
            })}
          />

          {errors.password && (
            <span className="text-red-500 text-xs mt-1 block">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="btn bg-[#a68847]/90 hover:text-[#0f2a3a] hover:scale-101 transition-all duration-200 w-full"
        >
          Accedi
        </button>

        <p className="text-center text-sm mt-5">
          Non hai un account?{" "}<br />
          <Link to={routes.register} className="text-white underline">
            Registrati
          </Link>
        </p>
      </form>
    </main>
  );
}