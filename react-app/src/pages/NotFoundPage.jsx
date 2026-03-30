import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "6rem 2rem",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="/assets/images/404.png"
        alt="404"
        style={{ maxWidth: "300px", marginBottom: "2rem" }}
      />
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>404</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        Page not found.
      </p>
      <Link to="/" className="btn-0">
        Go Home
      </Link>
    </div>
  );
}
