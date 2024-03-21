import { createUser } from "@/services/creatUserFormApi";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "./Loader";

export type SignUpFormData = {
  user_name: string;
  user_lastname: string;
  user_mail: string;
  confirmEmail: string;
  password: string;
  confirm_password: string;
};

const passwordRequirements =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const schema = z
  .object({
    user_name: z.string().trim().min(1, { message: "First name is required" }),
    user_lastname: z
      .string()
      .trim()
      .min(1, { message: "Last name is required" }),
    user_mail: z
      .string()
      .trim()
      .min(3, { message: "Email is required" })
      .email("This is not a valid email."),
    confirmEmail: z.string().trim().email("This is not a valid email."),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirm_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => passwordRequirements.test(data.password), {
    path: ["user_password"],
    message:
      "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character (@, $, !, %, *, ?, &).",
  })
  .refine((data) => data.user_mail === data.confirmEmail, {
    path: ["confirmEmail"],
    message: "Email don't match  ❌",
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirmPassword"],
    message: "Password don't match  ❌",
  });

export const SignUpForm = (): JSX.Element => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpFormData>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (
    data: SignUpFormData
  ) => {
    console.log(data);
    try {
      <Loader />;
      await createUser(data);
      await router.push(`/login`);
    } catch (error) {
      setError("root", {
        message: "Something is with wrong with your informations",
      });
      if (error instanceof z.ZodError) {
        console.error("Validation Errors:", error.errors);
      } else {
        console.error("Other Errors:", error);
      }
    }
  };

  return (
    <div className="flex content-center justify-center w-full mt-6 p-3">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-nav-font mb-6">Sign Up</h2>

        <form
          className="flex flex-col space-y-4 pb-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex space-x-4">
            <div className="flex-1 space-y-4 ">
              <label
                className="text-m font-medium text-neutral-700"
                htmlFor="user_name"
              >
                First Name
              </label>
              <input
                className="w-full p-2 border rounded focus:ring focus:ring-story"
                type="text"
                id="user_name"
                placeholder="John"
                {...register("user_name")}
              />
              {errors.user_name && (
                <div className="text-red-500">{errors.user_name.message}</div>
              )}
            </div>

            <div className="flex-1 space-y-4 ">
              <label
                htmlFor="user_lastname"
                className="text-m font-medium text-neutral-700"
              >
                Last Name
              </label>
              <input
                className="w-full p-2 border rounded focus:ring focus:ring-story"
                type="text"
                id="user_lastname"
                placeholder="Doe"
                {...register("user_lastname")}
              />
              {errors.user_lastname && (
                <div className="text-red-500">
                  {errors.user_lastname.message}
                </div>
              )}
            </div>
          </div>

          <label
            className="text-m font-medium text-neutral-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full p-2 border rounded focus:ring focus:ring-story"
            type="email"
            id="email"
            placeholder="toto@story.com"
            {...register("user_mail")}
          />
          {errors.user_mail && (
            <div className="text-red-500">{errors.user_mail.message}</div>
          )}
          <label
            className="text-m font-medium text-neutral-700"
            htmlFor="confirmEmail"
          >
            Confirm Email
          </label>
          <input
            className="w-full p-2 border rounded focus:ring focus:ring-story"
            type="email"
            id="confirmEmail"
            placeholder="toto@story.com"
            {...register("confirmEmail")}
          />
          {errors.confirmEmail && (
            <div className="text-red-500">{errors.confirmEmail.message}</div>
          )}

          <label
            className="text-m font-medium text-neutral-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full p-2 border rounded focus:ring focus:ring-story"
            type="password"
            id="password"
            placeholder="********"
            {...register("password")}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}

          <label
            htmlFor="confirm_password"
            className="text-m font-medium text-neutral-700"
          >
            Confirm your password
          </label>
          <input
            className="w-full p-2  border rounded focus:ring focus:ring-story"
            type="password"
            id="confirm_password"
            placeholder="********"
            {...register("confirm_password")}
          />
          {errors.confirm_password && (
            <div className="text-red-500">
              {errors.confirm_password.message}
            </div>
          )}

          <button
            disabled={isSubmitting}
            className="bg-button text-white py-2 my-3 rounded-md hover:bg-hover transition duration-300"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <p className="text-m text-neutral-600 mt-4">
          Already have an account? &nbsp;
          <Link href="/login" className="text-blue hover:underline">
            Sign In &nbsp;
          </Link>
        </p>
      </div>
    </div>
  );
};

// const [formData, setFormData] = useState<SignUpFormData>({
//   user_name: "",
//   user_lastname: "",
//   user_mail: "",
//   confirmEmail: "",
//   user_password: "",
//   confirm_user_password: "",
// });

// const handleChange = (
//   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
// ) => {
//   const { name, value } = e.target;
//   setFormData((prevData) => ({
//     ...prevData,
//     [name]: value,
//   }));
// };

// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();

//   if (formData.user_mail !== formData.confirmEmail) {
//     alert("Emails do not match ❌ ");
//     return;
//   } else if (formData.user_password !== formData.confirm_user_password) {
//     alert("The password do not match ❌");
//     return;
//   }

//   try {
//     const newUser = await createUser(formData);
//   } catch (error) {
//     // Handle error here
//   }

//   console.log(formData);
// };

//   return (
//     <div className="flex content-center justify-center w-full mt-6 p-3">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-bold text-font mb-6">Sign Up</h2>