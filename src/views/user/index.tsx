import { useEffect, useState } from "react";
import { IGetUserData } from "../../interfaces/IGetUserData";
import { GoMarkGithub } from "react-icons/go";
import { FaLinkedin } from "react-icons/fa";
export function UserPage() {
  const [userData, setUserData] = useState<IGetUserData>();

  useEffect(() => {
    loadUserData();
  }, []);

  function loadUserData() {
    const storageUserData = localStorage.getItem("userdata");
    setUserData(JSON.parse(storageUserData || ""));
  }

  function onClickGithubButton() {
    window.open(`https://github.com/${userData?.githubProfile}`, "_blank");
  }

  function onClickLinkedInButton() {
    window.open(`https://linkedin.com/in/${userData?.linkedinProfile}`, "_blank");
  }

  return (
    <div className="space-y-8 p-8">
      <p className="text-lg">Hello, my name is {userData?.name}</p>

      <h1 className="text-xl font-semibold">My history</h1>

      <p className="w-3/5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate voluptates modi quos
        voluptatibus ducimus inventore doloribus architecto autem, nemo, officia, consequatur
        quod fuga aliquam. Magnam quisquam distinctio beatae fugiat eum.
      </p>

      <div className="flex-auto flex space-x-4">
        <button
          className="flex items-center space-x-1 h-10 px-6 font-semibold rounded-full bg-violet-600 text-white hover:bg-violet-700"
          type="submit"
          onClick={onClickGithubButton}
        >
          <span>Github</span> <GoMarkGithub />
        </button>
        <button
          className="flex items-center space-x-1  h-10 px-6 font-semibold rounded-full bg-sky-400  text-white hover:bg-sky-500"
          type="button"
          onClick={onClickLinkedInButton}
        >
          <span>LinkedIn</span>
          <FaLinkedin />
        </button>
      </div>
    </div>
  );
}
