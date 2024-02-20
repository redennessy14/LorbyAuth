import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import style from "../../styles/SignIn.module.scss";
import { AuthContext } from "../../context/AuthContext";

const SignIn = ({ setShowSignUp }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    reset,
  } = useForm();

  const { handleSignIn } = useContext(AuthContext);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  //   const handleMouseDownPassword = (event) => {
  //     event.preventDefault();
  //   };

  const onSubmit = (data) => {
    handleSignIn(data);
    reset();
  };

  const handleClick = () => {
    setShowSignUp(true);
  };

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <p>Вэлком бэк!</p>
        <Controller
          control={control}
          name="username"
          rules={{ required: "Username пустой" }}
          defaultValue={""}
          render={({ field }) => (
            <TextField
              error={!!errors.username}
              helperText={errors.username?.message?.toString()}
              label="Ввидите логин"
              {...field}
              type="text"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
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
        <Button
          sx={{
            marginTop: "20px",
            width: "343px",
            padding: "13px 16px",
            fontSize: "16px",
            backgroundColor: "rgba(41, 41, 41, 1)",
            "&:hover": { backgroundColor: "rgba(118, 118, 118, 1)" },
            borderRadius: "12px",
          }}
          type="submit"
          variant="contained"
        >
          Войти
        </Button>
      </form>
      <div>
        <span className={style.linkText} onClick={handleClick}>
          {" "}
          У меня еще нет аккаунта
        </span>
      </div>
    </>
  );
};

export default SignIn;
