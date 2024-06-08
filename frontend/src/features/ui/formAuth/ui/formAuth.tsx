import styles from "./formAuth.module.scss";
import { FormAuthProps } from "./formAuth.props";
import { Input } from "@shared/ui/Input";
import { Button } from "@shared/ui/Button";
import { Paragraph } from "@shared/ui/Paragraph";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "@shared/api/auth/auth.service";
import { useAuth } from "@/features/hooks/useAuth";

// const formType = {
//   signin: "Вход",
//   register: "Регистрация",
// };

export const FormAuth: React.FC<FormAuthProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { authenticate } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await AuthService.login(email, password);
      authenticate(response.user);
      return navigate("/admin");
    } catch (error) {
      setError("Ошибка");
    }
  };

  return (
    <form className={styles.from} onSubmit={handleSubmit}>
      <div className={styles.content}>
        {error ? (
          <div className={styles.error}>
            <Paragraph>{error}</Paragraph>
          </div>
        ) : null}
        <div>
          <Paragraph>Email</Paragraph>
          <Input onChange={(event) => setEmail(event.target.value)} required />
        </div>
        <div>
          <Paragraph>Password</Paragraph>
          <Input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            maxLength={32}
            required
          />
        </div>
        <Button type="submit" text="Войти" />
      </div>
    </form>
  );
};
