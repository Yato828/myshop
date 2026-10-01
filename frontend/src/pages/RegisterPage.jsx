import { useState } from "react";
import "./RegisterPage.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

export default function RegisterPage({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    password: "",
    repeatPassword: "",
  });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setStatus("");

    if (form.password !== form.repeatPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          password: form.password,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Не удалось зарегистрироваться");
      }

      localStorage.setItem("token", data.token);
      setStatus(`Готово, ${data.user.name}! JWT токен сохранен.`);
      setForm({
        name: "",
        password: "",
        repeatPassword: "",
      });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="register-page">
      <section className="register-panel">
        <button
          className="register-close"
          type="button"
          onClick={onClose}
          aria-label="Вернуться на главную"
          title="Вернуться на главную"
        />

        <p className="register-eyebrow">JWT AUTH</p>
        <h1>Регистрация</h1>
        <p className="register-copy">
          Создай аккаунт, и будь крутым пацыком.
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          <label>
            Имя пользователя
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="ivan"
              autoComplete="username"
              required
            />
          </label>

          <label>
            Пароль
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Минимум 6 символов"
              autoComplete="new-password"
              minLength="6"
              required
            />
          </label>

          <label>
            Повтор пароля
            <input
              name="repeatPassword"
              type="password"
              value={form.repeatPassword}
              onChange={handleChange}
              placeholder="Еще раз пароль"
              autoComplete="new-password"
              minLength="6"
              required
            />
          </label>

          {error && <p className="register-message is-error">{error}</p>}
          {status && <p className="register-message is-success">{status}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Регистрируем..." : "Зарегистрироваться"}
          </button>
        </form>
      </section>
    </main>
  );
}
