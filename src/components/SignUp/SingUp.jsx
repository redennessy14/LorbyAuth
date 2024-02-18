import React, { useContext, useEffect, useState } from "react";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import style from "../../styles/SignUp.module.scss";
import ActivateCode from "../ActivateCode/ActivateCode";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SingUp = ({ setShowActivation, showActivation }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    watch,
  } = useForm();

  const { handleSignUp } = useContext(AuthContext);

  const passwordConfirm = watch("password");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [passwordValidation, setPasswordValidation] = useState([
    undefined,
    undefined,
    undefined,
    undefined,
  ]);

  useEffect(() => {
    const value = watch("password");
    if (typeof value === "undefined" || value === "") return;
    const hasMinLength = value.length >= 8 && value.length <= 15;
    const hasLowercase = /[a-z]/.test(value) && /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

    setPasswordValidation([
      hasMinLength,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
    ]);
  }, [watch("password")]);
  const onSubmit = (data) => {
    console.log(data);
    handleSignUp(data);
    setShowActivation(true);
  };
  return (
    <div>
      {!showActivation ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <p>Создать аккаунт Lorby</p>
          <Controller
            control={control}
            name="email"
            rules={{ required: "Email пустой " }}
            render={({ field }) => (
              <TextField
                error={!!errors.email}
                helperText={errors.email?.message?.toString()}
                label="Email"
                {...register("email", {
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Entered value does not match email format",
                  },
                })}
                {...field}
                type="text"
              />
            )}
          />
          <Controller
            control={control}
            name="username"
            rules={{ required: "Login пустой " }}
            render={({ field }) => (
              <TextField
                error={!!errors.username}
                helperText={errors.username?.message?.toString()}
                label="Придумайте логин"
                {...field}
                type="text"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            onChange={(e) => handlePasswordChange(e)}
            defaultValue={""}
            rules={{ required: "Пароль пустой" }}
            render={({ field }) => (
              <TextField
                sx={{ marginTop: "20px" }}
                error={!!errors.password}
                helperText={errors.password?.message?.toString()}
                label="Ввидите пароль"
                {...field}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <div className={style.rules}>
            <ul>
              {passwordValidation.map((isValid, index) => (
                <li
                  key={index}
                  className={isValid ? style.valid : style.invalid}
                >
                  {index === 0 && "От 8 до 15 символов Минимум"}
                  {index === 1 && "Строчные и прописные буквы"}
                  {index === 2 && "Минимум 1 цифра"}
                  {index === 3 && '1 спецсимвол (!, ", #, $...)'}
                  {isValid !== undefined && (isValid ? "✅" : "❌")}
                </li>
              ))}
            </ul>
          </div>
          <Controller
            control={control}
            name="password_confirm"
            rules={{
              required: "Повтор пароля пустой",
              validate: (value) =>
                value === passwordConfirm || "Пароли не совпадают",
            }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                error={!!errors.password_confirm}
                helperText={errors.password_confirm?.message?.toString()}
                label="Повторите пароль"
                {...field}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: "20px",
              width: "343px",
              padding: "13px 16px",
              fontSize: "16px",
              backgroundColor: "rgba(118, 118, 118, 1)",
              "&:hover": { backgroundColor: "rgba(41, 41, 41, 1)" },
              borderRadius: "12px",
            }}
          >
            Далее
          </Button>
        </form>
      ) : (
        <ActivateCode />
      )}
    </div>
  );
};

export default SingUp;
