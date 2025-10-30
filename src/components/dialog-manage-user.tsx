import React from 'react';
import useUsers from '../hooks/use-users';
import type { UserDataType } from '../models/users';
import Input from './input';
import { useForm, type SubmitHandler } from 'react-hook-form';

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

export default function DialogManageUser({
  open,
  setOpen,
  selectedUser,
  onSubmit,
}: DialogManageUserProps): React.ReactElement {
  const { users } = useUsers();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormDataType>();

  const ref = React.useRef<HTMLInputElement>(null);

  const submitHandler: SubmitHandler<UserFormDataType> = (data) => {
    const userData = {
      id: selectedUser ? data.id : Math.max(...users.map((user) => user.id)) + 1,
      name: data.name,
      username: data.username,
      email: data.email,
      address: {
        street: data.addressStreet,
        suite: data.addressSuite,
        city: data.addressCity,
        zipcode: data.addressZipcode,
        geo: {
          lat: data.addressGeoLat,
          lng: data.addressGeoLng,
        },
      },
      phone: data.phone,
      website: data.website,
      company: {
        name: data.companyName,
        catchPhrase: data.companyCatchPhrase,
        bs: data.companyBs,
      },
    };
    onSubmit(userData);
    setOpen(false);
  };

  React.useEffect(() => {
    if (open) {
      ref.current?.focus();
    }
  }, [open]);
  React.useEffect(() => {
    if (!open) {
      return;
    }

    reset({
      id: selectedUser?.id || 0,
      name: selectedUser?.name || '',
      username: selectedUser?.username || '',
      email: selectedUser?.email || '',
      addressStreet: selectedUser?.address.street || '',
      addressSuite: selectedUser?.address.suite || '',
      addressCity: selectedUser?.address.city || '',
      addressZipcode: selectedUser?.address.zipcode || '',
      addressGeoLat: selectedUser?.address.geo.lat || '',
      addressGeoLng: selectedUser?.address.geo.lng || '',
      phone: selectedUser?.phone || '',
      website: selectedUser?.website || '',
      companyName: selectedUser?.company.name || '',
      companyCatchPhrase: selectedUser?.company.catchPhrase || '',
      companyBs: selectedUser?.company.bs || '',
    });
  }, [open, reset, selectedUser]);

  return (
    <div
      className={`absolute top-0 left-0 z-10 h-svh w-svw items-center justify-center bg-black/30 px-4 transition-all ${
        open ? 'flex' : 'hidden'
      }`}
    >
      <div className="relative max-h-[80svh] max-w-[480px] rounded-2xl bg-white pt-8 pb-2 shadow-2xl sm:w-[480px]">
        <div className="mb-5 px-8">
          <p className="text-lg font-semibold">{selectedUser ? 'Edit User' : 'Add New User'}</p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="h-[calc(100svh-24rem)] overflow-y-auto px-8">
            <Input
              label="Username"
              className="mb-2"
              placeholder="Username..."
              errorMessage={errors.username?.message}
              {...register('username', { required: 'Username is required' })}
            />
            <Input
              label="Name"
              className="mb-2"
              placeholder="Name..."
              {...register('name', { required: 'Name is required' })}
              errorMessage={errors.name?.message}
            />
            <Input
              label="Email"
              className="mb-2"
              placeholder="Email..."
              {...register('email', { required: 'Email is required' })}
              errorMessage={errors.email?.message}
            />
            <Input
              label="Phone"
              className="mb-2"
              placeholder="Phone..."
              {...register('phone', { required: 'Phone is required' })}
              errorMessage={errors.phone?.message}
            />
            <Input
              label="Website"
              className="mb-2"
              placeholder="Website..."
              {...register('website', { required: 'website is required' })}
              errorMessage={errors.website?.message}
            />
            <p className="mt-4 mb-2 font-medium">Address</p>
            <Input
              label="Street"
              className="mb-2"
              placeholder="Street..."
              {...register('addressStreet', { required: 'Street is required' })}
              errorMessage={errors.addressStreet?.message}
            />
            <Input
              label="Suite"
              className="mb-2"
              placeholder="Suite..."
              {...register('addressSuite', { required: 'Suite is required' })}
              errorMessage={errors.addressSuite?.message}
            />
            <Input
              label="City"
              className="mb-2"
              placeholder="City..."
              {...register('addressCity', { required: 'City is required' })}
              errorMessage={errors.addressCity?.message}
            />
            <Input
              label="Zipcode"
              className="mb-2"
              placeholder="Zipcode..."
              {...register('addressZipcode', { required: 'Zipcode is required' })}
              errorMessage={errors.addressZipcode?.message}
            />
            <div className="w-full">
              <p className="mb-1 text-sm text-gray-800">Geo</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Lat..."
                  className="mb-2 w-1/2"
                  {...register('addressGeoLat', { required: 'Lat is required' })}
                  errorMessage={errors.addressGeoLat?.message}
                />
                <Input
                  placeholder="Lng..."
                  className="mb-2 w-1/2"
                  {...register('addressGeoLng', { required: 'Lng is required' })}
                  errorMessage={errors.addressGeoLng?.message}
                />
              </div>
            </div>
            <p className="mt-4 mb-2 font-medium">Company</p>
            <Input
              label="Company Name"
              className="mb-2"
              placeholder="Name..."
              {...register('companyName', { required: 'Company name is required' })}
              errorMessage={errors.companyName?.message}
            />
            <Input
              label="Catch Phrase"
              className="mb-2"
              placeholder="Catch Phrase..."
              {...register('companyCatchPhrase', { required: 'Company catch phrase is required' })}
              errorMessage={errors.companyCatchPhrase?.message}
            />
            <Input
              label="Bs"
              placeholder="Bs..."
              {...register('companyBs', { required: 'Company Bs is required' })}
              errorMessage={errors.companyBs?.message}
            />
          </div>

          <div className="mt-2 flex w-full justify-end gap-2 px-4">
            <button
              type="submit"
              className="my-4 h-10 w-24 cursor-pointer rounded-lg bg-orange-500 px-3 text-white hover:bg-orange-600"
            >
              Submit
            </button>
            <button
              type="button"
              className="my-4 h-10 w-24 cursor-pointer rounded-lg bg-gray-500 px-3 text-white hover:bg-gray-600"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </form>

        <div className="absolute top-4 right-4">
          <button
            onClick={() => setOpen(false)}
            className="cursor-pointer rounded-lg p-1 hover:bg-gray-200"
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
              role="button"
            >
              <title>X</title>
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
