import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosInstance from "@/app/_lib/axios";
import { useUser } from "@/app/_context/UserContext";
import { toast, ToastContainer } from "react-toastify";

function EditProfile() {
  const t = useTranslations("Register");
  const { user, setUser } = useUser();
  const userInitial = user && user.name.charAt(0).toUpperCase();

  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const editProfileSchema = z.object({
    name: z.string().nonempty({ message: t("userNameRequiredMsg") }),
    email: z
      .string()
      .nonempty({ message: t("emailRequiredMsg") })
      .email(t("validEmailMsg")),
  });

  type FormFields = z.infer<typeof editProfileSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormFields>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
    mode: "onTouched",
    resolver: zodResolver(editProfileSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setLoadingSpinner(true);
    try {
      const response = await axiosInstance.post("profile", data);
      setLoadingSpinner(false);
      const userProfile = response.data.data;
      setUser({
        email: userProfile.email,
        name: userProfile.name,
        subscribe_flag: userProfile.subscribe_flag,
      });
      reset({ name: userProfile.name, email: userProfile.email });
      toast.success(response?.data?.message);
    } catch (error: any) {
      setLoadingSpinner(false);
      toast.error(error?.response?.data?.message, {
        onClose: () => toast.dismiss(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        rtl={false}
        theme="light"
      />
      <div className="register-form w-full">
        <div className="w-full flex justify-center items-center">
          <h3 className="bg-yellow rounded-full py-4 px-6  text-white text-size20 mb-8 inline-block">
            {userInitial || "Profile"}
          </h3>
        </div>
        <div className="form-control  mb-9">
          <label
            htmlFor="name"
            className="flex text-black text-size18 md:text-size22 font-regular mb-4"
          >
            {t("userName")}
          </label>
          <input
            type="text"
            id="name"
            placeholder={t("userName")}
            className="w-full rounded-md  shadow-sm sm:text-sm h-[50px] text-black border indent-2.5 !outline-none"
            {...register("name", {
              required: true,
            })}
          />
          {errors.name && (
            <p className="flex text-red-500 text-sm mt-2 ">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="form-control  mb-9">
          <label
            htmlFor="UserEmail"
            className="flex text-black text-size18 md:text-size22 font-regular mb-4"
          >
            {t("email")}
          </label>
          <input
            type="email"
            id="UserEmail"
            placeholder={t("email")}
            className="w-full rounded-md  shadow-sm sm:text-sm h-[50px] text-black border indent-2.5 !outline-none"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && (
            <p className="flex text-red-500 text-sm mt-2">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="pt-8 flex justify-center">
          <button
            type="submit"
            className="btn-yellow flex justify-center"
            disabled={!isDirty || !isValid}
          >
            {loadingSpinner ? (
              <div className="border-white h-10 w-10 animate-spin rounded-full border-2 border-t-primary mx-4   p-3" />
            ) : (
              t("save")
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditProfile;
