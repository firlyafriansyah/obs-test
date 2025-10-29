import * as React from "react";
import useUsers from "../hooks/use-users";
import type { UserDataType } from "../models/users";
import Input from "./input";

interface DialogManageUserProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedUser: UserDataType | null;
  onSubmit: (data: UserDataType) => void;
}

type UserFormDataType = {
  id: number;
  name: string;
  username: string;
  email: string;
  addressStreet: string;
  addressSuite: string;
  addressCity: string;
  addressZipcode: string;
  addressGeoLat: string;
  addressGeoLng: string;
  phone: string;
  website: string;
  companyName: string;
  companyCatchPhrase: string;
  companyBs: string;
};

const initialUserForm: UserFormDataType = {
  id: 0,
  name: "",
  username: "",
  email: "",
  addressStreet: "",
  addressSuite: "",
  addressCity: "",
  addressZipcode: "",
  addressGeoLat: "",
  addressGeoLng: "",
  phone: "",
  website: "",
  companyName: "",
  companyCatchPhrase: "",
  companyBs: "",
};

export default function DialogManageUser({
  open,
  setOpen,
  selectedUser,
  onSubmit,
}: DialogManageUserProps) {
  const { users } = useUsers();

  const ref = React.useRef<HTMLInputElement>(null);

  const [userForm, setUserForm] =
    React.useState<UserFormDataType>(initialUserForm);
  const [error, setError] = React.useState<{ field: string; message: string }>({
    field: "",
    message: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError({ field: "", message: "" });
  };
  const validateUserInput = () => {
    if (!userForm.username) {
      setError({
        field: "username",
        message: "Username is required",
      });
      return false;
    }
    if (!userForm.name) {
      setError({
        field: "name",
        message: "Name is required",
      });
      return false;
    }
    if (!userForm.email) {
      setError({
        field: "email",
        message: "Email is required",
      });
      return false;
    }
    if (!userForm.addressStreet) {
      setError({
        field: "addressStreet",
        message: "Street is required",
      });
      return false;
    }
    if (!userForm.addressSuite) {
      setError({
        field: "addressSuite",
        message: "Suite is required",
      });
      return false;
    }
    if (!userForm.addressCity) {
      setError({
        field: "addressCity",
        message: "City is required",
      });
      return false;
    }
    if (!userForm.addressZipcode) {
      setError({
        field: "addressZipcode",
        message: "Zipcode is required",
      });
      return false;
    }
    if (!userForm.addressGeoLat) {
      setError({
        field: "addressGeoLat",
        message: "Lat is required",
      });
      return false;
    }
    if (!userForm.addressGeoLng) {
      setError({
        field: "addressGeoLng",
        message: "Lng is required",
      });
      return false;
    }
    if (!userForm.companyName) {
      setError({
        field: "companyName",
        message: "Company name is required",
      });
      return false;
    }
    if (!userForm.companyCatchPhrase) {
      setError({
        field: "companyCatchPhrase",
        message: "Catch phrase is required",
      });
      return false;
    }
    if (!userForm.companyBs) {
      setError({
        field: "companyBs",
        message: "Bs is required",
      });
      return false;
    }

    return true;
  };
  const handleSubmit = () => {
    if (!validateUserInput()) return;
    const userData = {
      id: selectedUser
        ? userForm.id
        : Math.max(...users.map((user) => user.id)) + 1,
      name: userForm.name,
      username: userForm.username,
      email: userForm.email,
      address: {
        street: userForm.addressStreet,
        suite: userForm.addressSuite,
        city: userForm.addressCity,
        zipcode: userForm.addressZipcode,
        geo: {
          lat: userForm.addressGeoLat,
          lng: userForm.addressGeoLng,
        },
      },
      phone: userForm.phone,
      website: userForm.website,
      company: {
        name: userForm.companyName,
        catchPhrase: userForm.companyCatchPhrase,
        bs: userForm.companyBs,
      },
    };
    onSubmit(userData);
  };

  React.useEffect(() => {
    if (!open) return;

    setUserForm((prev) => ({
      ...prev,
      id: selectedUser?.id || 0,
      name: selectedUser?.name || "",
      username: selectedUser?.username || "",
      email: selectedUser?.email || "",
      addressStreet: selectedUser?.address.street || "",
      addressSuite: selectedUser?.address.suite || "",
      addressCity: selectedUser?.address.city || "",
      addressZipcode: selectedUser?.address.zipcode || "",
      addressGeoLat: selectedUser?.address.geo.lat || "",
      addressGeoLng: selectedUser?.address.geo.lng || "",
      phone: selectedUser?.phone || "",
      website: selectedUser?.website || "",
      companyName: selectedUser?.company.name || "",
      companyCatchPhrase: selectedUser?.company.catchPhrase || "",
      companyBs: selectedUser?.company.bs || "",
    }));
  }, [open, selectedUser]);
  React.useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        ref.current?.focus();
      });
    }
  }, [open]);

  return (
    <div
      className={`absolute top-0 left-0 justify-center items-center bg-black/30 h-svh w-svw z-10 transition-all px-4 ${
        open ? "flex" : "hidden"
      }`}
    >
      <div className="relative max-h-[80svh] max-w-[480px] sm:w-[480px] bg-white shadow-2xl rounded-2xl pt-8 pb-2 ">
        <div className="px-8 mb-5">
          <p className="text-lg font-semibold">
            {selectedUser ? "Edit User" : "Add New User"}
          </p>
        </div>

        <div>
          <div className="h-[calc(100svh-24rem)] overflow-y-auto px-8">
            <Input
              ref={ref}
              name="username"
              label="Username"
              className="mb-2"
              placeholder="Username..."
              value={userForm.username}
              onChange={onChangeHandler}
              errorMessage={error.field === "username" ? error.message : ""}
            />
            <Input
              name="name"
              label="Name"
              placeholder="Name..."
              className="mb-2"
              value={userForm?.name}
              onChange={onChangeHandler}
              errorMessage={error.field === "name" ? error.message : ""}
            />
            <Input
              name="email"
              label="Email"
              placeholder="Email..."
              className="mb-2"
              value={userForm?.email}
              onChange={onChangeHandler}
              errorMessage={error.field === "email" ? error.message : ""}
            />
            <Input
              name="phone"
              label="Phone"
              placeholder="Phone..."
              className="mb-2"
              value={userForm?.phone}
              onChange={onChangeHandler}
              errorMessage={error.field === "phone" ? error.message : ""}
            />
            <Input
              name="website"
              label="Website"
              placeholder="Website..."
              className="mb-2"
              value={userForm?.website}
              onChange={onChangeHandler}
              errorMessage={error.field === "website" ? error.message : ""}
            />
            <p className="font-medium mb-2 mt-4">Address</p>
            <Input
              name="addressStreet"
              label="Street"
              placeholder="Street..."
              className="mb-2"
              value={userForm?.addressStreet}
              onChange={onChangeHandler}
              errorMessage={
                error.field === "addressStreet" ? error.message : ""
              }
            />
            <Input
              name="addressSuite"
              label="Suite"
              placeholder="Suite..."
              className="mb-2"
              value={userForm?.addressSuite}
              onChange={onChangeHandler}
              errorMessage={error.field === "addressSuite" ? error.message : ""}
            />
            <Input
              name="addressCity"
              label="City"
              placeholder="City..."
              className="mb-2"
              value={userForm?.addressCity}
              onChange={onChangeHandler}
              errorMessage={error.field === "addressCity" ? error.message : ""}
            />
            <Input
              name="addressZipcode"
              label="Zipcode"
              placeholder="Zipcode..."
              className="mb-2"
              value={userForm?.addressZipcode}
              onChange={onChangeHandler}
              errorMessage={
                error.field === "addressZipcode" ? error.message : ""
              }
            />
            <div className="w-full">
              <p className="text-sm mb-1 text-gray-800">Geo</p>
              <div className="flex gap-2">
                <Input
                  name="addressGeoLat"
                  placeholder="Lat..."
                  className="w-1/2 mb-2"
                  value={userForm?.addressGeoLat}
                  onChange={onChangeHandler}
                  errorMessage={
                    error.field === "addressGeoLat" ? error.message : ""
                  }
                />
                <Input
                  name="addressGeoLng"
                  placeholder="Lng..."
                  className="w-1/2 mb-2"
                  value={userForm?.addressGeoLng}
                  onChange={onChangeHandler}
                  errorMessage={
                    error.field === "addressGeoLng" ? error.message : ""
                  }
                />
              </div>
            </div>
            <p className="font-medium mb-2 mt-4">Company</p>
            <Input
              name="companyName"
              label="Name"
              placeholder="Name..."
              className="mb-2"
              value={userForm?.companyName}
              onChange={onChangeHandler}
              errorMessage={error.field === "companyName" ? error.message : ""}
            />
            <Input
              name="companyCatchPhrase"
              label="Catch Phrase"
              placeholder="Catch Phrase..."
              className="mb-2"
              value={userForm?.companyCatchPhrase}
              onChange={onChangeHandler}
              errorMessage={
                error.field === "companyCatchPhrase" ? error.message : ""
              }
            />
            <Input
              name="companyBs"
              label="Bs"
              placeholder="Bs..."
              value={userForm?.companyBs}
              onChange={onChangeHandler}
              errorMessage={error.field === "companyBs" ? error.message : ""}
            />
          </div>

          <div className="flex w-full justify-end px-4 gap-2 mt-2">
            <button
              className="h-10 w-24 px-3 my-4 bg-orange-500 text-white rounded-lg cursor-pointer hover:bg-orange-600"
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
            <button
              className="h-10 w-24 px-3 my-4 bg-gray-500 text-white rounded-lg cursor-pointer hover:bg-gray-600"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-lg cursor-pointer hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              role={"button"}
            >
              <title>Close</title>
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
