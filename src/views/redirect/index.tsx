import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getUserDataFromQRCode } from "../../services/user.service";

export function RedirectPage() {
  const routeParams = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setUserDataFromQRCode();
  }, []);

  async function setUserDataFromQRCode() {
    const { uuid } = routeParams;
    if (uuid) {
      const userDataFromQRCode = await getUserDataFromQRCode(uuid);
      localStorage.setItem("userdata", JSON.stringify(userDataFromQRCode));
      navigate("/user");
    }
  }

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}
