import { useState } from "react";
import { useQRCode } from "react-qrcode";
import { ICreateUserData } from "../../interfaces/ICreateUserData";
import { createUser } from "../../services/user.service";

import { MdIosShare } from "react-icons/md";

export function GeneratePage() {
  const [username, setUsername] = useState("");
  const [userLinkedinProfile, setUserLinkedinProfile] = useState("");
  const [userGithubProfile, setUserGithubProfile] = useState("");
  const [invalidFieldsError, setInvalidFieldsError] = useState("");
  const [qrCodeValue, setQrCodeValue] = useState("");


  // const [redirectURL, setRedirectURL] = useState("");
  // function navigateToUserPage() {
  //   window.location.href = redirectURL;
  // }


  const QRCodeURL = useQRCode(qrCodeValue);

  function onChangeFieldUsername(value: string) {
    setUsername(value);
  }

  function onChangeFieldLinkedinProfile(value: string) {
    setUserLinkedinProfile(value);
  }

  function onChangeFieldGithubProfile(value: string) {
    setUserGithubProfile(value);
  }

  async function sendDataToGenerateQRCode() {
    const userData: ICreateUserData = {
      name: username,
      linkedinProfile: userLinkedinProfile,
      githubProfile: userGithubProfile,
    };

    const hasInvalidData = Object.values(userData).some((data) => !data);
    const invalidDataErrorMessage = "please fill out the required(*) field(s)";

    setInvalidFieldsError(hasInvalidData ? invalidDataErrorMessage : "");

    if (!hasInvalidData) {
      const userId = await createUser(userData);
      if (userId) {
        const redirectUrl = `${window.location.origin}/redirect/${userId}`;

        // setRedirectURL(redirectUrl);
        setQrCodeValue(redirectUrl);
      }
    }
  }

  return (
    <div className="lg:flex lg:item-center lg:justify-between md:justify-center">
      <div className="p-8 w-full">
        <h1 className="text-base font-semibold leading-7 text-gray-900">
          QR Code Image Generator
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name*
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                  myVirtualCard.com/
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="matheus"
                  onChange={(e) => onChangeFieldUsername(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="linkedinProfile"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              LinkedIn Profile*
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                  linkedin.com/in/
                </span>
                <input
                  type="text"
                  name="linkedinProfile"
                  id="linkedinProfile"
                  autoComplete="linkedinProfile"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="matheus-gs"
                  onChange={(e) => onChangeFieldLinkedinProfile(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="githubProfile"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              GitHub Profile
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                  github.com/
                </span>
                <input
                  type="text"
                  name="githubProfile"
                  id="githubProfile"
                  autoComplete="githubProfile"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="matheus-gs"
                  onChange={(e) => onChangeFieldGithubProfile(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center">
          <button
            type="button"
            className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={sendDataToGenerateQRCode}
          >
            Generate Image
          </button>
        </div>
      </div>

      <div className="p-8 w-full flex flex-col justify-center items-center">
        {invalidFieldsError || <img src={QRCodeURL} />}
        {/* {QRCodeURL && (
          <button
            className="flex items-center space-x-1 rounded-md bg-indigo-400 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={navigateToUserPage}
          >
            <span>Share</span>
            <MdIosShare />
          </button>
        )} */}
      </div>
    </div>
  );
}
