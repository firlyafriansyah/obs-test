import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { UserDataType } from '../../models/users';
import GetUsersServices from '../../services/get-users';

// Mock fetch globally
globalThis.fetch = vi.fn();

describe('GetUsersServices', () => {
  const mockUsers: UserDataType[] = [
    {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      address: {
        street: 'Main St',
        suite: 'Apt 1',
        city: 'New York',
        zipcode: '10001',
        geo: {
          lat: '40.7128',
          lng: '-74.0060',
        },
      },
      phone: '123-456-7890',
      website: 'johndoe.com',
      company: {
        name: 'Doe Inc',
        catchPhrase: 'Just do it',
        bs: 'business solutions',
      },
    },
    {
      id: 2,
      name: 'Jane Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      address: {
        street: 'Second St',
        suite: 'Suite 2',
        city: 'Los Angeles',
        zipcode: '90001',
        geo: {
          lat: '34.0522',
          lng: '-118.2437',
        },
      },
      phone: '098-765-4321',
      website: 'janesmith.com',
      company: {
        name: 'Smith Corp',
        catchPhrase: 'Innovation first',
        bs: 'tech solutions',
      },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Successful Responses', () => {
    it('should fetch users successfully', async () => {
      const mockResponse = {
        ok: true,
        json: async () => mockUsers,
      };
      (globalThis.fetch as vi.MockedFunction<typeof fetch>).mockResolvedValueOnce(mockResponse);

      const result = await GetUsersServices();

      expect(result).toEqual(mockUsers);
      expect(result).toHaveLength(2);
    });

    it('should call the correct API endpoint', async () => {
      const mockResponse = {
        ok: true,
        json: async () => mockUsers,
      };
      (globalThis.fetch as any).mockResolvedValueOnce(mockResponse);

      await GetUsersServices();

      expect(globalThis.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when API returns empty array', async () => {
      const mockResponse = {
        ok: true,
        json: async () => [],
      };
      (globalThis.fetch as any).mockResolvedValueOnce(mockResponse);

      const result = await GetUsersServices();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should return users with all required properties', async () => {
      const mockResponse = {
        ok: true,
        json: async () => mockUsers,
      };
      (globalThis.fetch as any).mockResolvedValueOnce(mockResponse);

      const result = await GetUsersServices();

      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('username');
      expect(result[0]).toHaveProperty('email');
      expect(result[0]).toHaveProperty('address');
      expect(result[0]).toHaveProperty('phone');
      expect(result[0]).toHaveProperty('website');
      expect(result[0]).toHaveProperty('company');
    });

    it('should return users with nested address properties', async () => {
      const mockResponse = {
        ok: true,
        json: async () => mockUsers,
      };
      (globalThis.fetch as any).mockResolvedValueOnce(mockResponse);

      const result = await GetUsersServices();

      expect(result[0].address).toHaveProperty('street');
      expect(result[0].address).toHaveProperty('suite');
      expect(result[0].address).toHaveProperty('city');
      expect(result[0].address).toHaveProperty('zipcode');
      expect(result[0].address).toHaveProperty('geo');
      expect(result[0].address.geo).toHaveProperty('lat');
      expect(result[0].address.geo).toHaveProperty('lng');
    });

    it('should return users with nested company properties', async () => {
      const mockResponse = {
        ok: true,
        json: async () => mockUsers,
      };
      (globalThis.fetch as any).mockResolvedValueOnce(mockResponse);

      const result = await GetUsersServices();

      expect(result[0].company).toHaveProperty('name');
      expect(result[0].company).toHaveProperty('catchPhrase');
      expect(result[0].company).toHaveProperty('bs');
    });

    it('should handle single user in array', async () => {
      const mockResponse = {
        ok: true,
        json: async () => [mockUsers[0]],
      };
      (globalThis.fetch as any).mockResolvedValueOnce(mockResponse);

      const result = await GetUsersServices();

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('John Doe');
    });

    it('should handle multiple users', async () => {
      const mockResponse = {
        ok: true,
        json: async () => mockUsers,
      };
      (globalThis.fetch as any).mockResolvedValueOnce(mockResponse);

      const result = await GetUsersServices();

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('John Doe');
      expect(result[1].name).toBe('Jane Smith');
    });
  });

  describe('Error Handling', () => {
    it('should reject with error message when fetch fails', async () => {
      const errorMessage = 'Network error';
      (globalThis.fetch as any).mockRejectedValueOnce(new Error(errorMessage));

      await expect(GetUsersServices()).rejects.toBe(errorMessage);
    });

    it('should reject when network is unavailable', async () => {
      (globalThis.fetch as any).mockRejectedValueOnce(new Error('Failed to fetch'));

      await expect(GetUsersServices()).rejects.toBe('Failed to fetch');
    });

    it('should reject when API returns error', async () => {
      (globalThis.fetch as any).mockRejectedValueOnce(new Error('API Error'));

      await expect(GetUsersServices()).rejects.toBe('API Error');
    });

    it('should handle timeout errors', async () => {
      (globalThis.fetch as any).mockRejectedValueOnce(new Error('Request timeout'));

      await expect(GetUsersServices()).rejects.toBe('Request timeout');
    });

    it('should handle server errors', async () => {
      (globalThis.fetch as any).mockRejectedValueOnce(new Error('500 Internal Server Error'));

      await expect(GetUsersServices()).rejects.toBe('500 Internal Server Error');
    });

    it('should handle JSON parsing errors', async () => {
      const mockResponse = {
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      };
      (globalThis.fetch as any).mockResolvedValueOnce(mockResponse);

      await expect(GetUsersServices()).rejects.toBe('Invalid JSON');
    });
  });

  describe('Promise Behavior', () => {
    it('should return a Promise', () => {
      const mockResponse = {
        ok: true,
        json: async () => mockUsers,
      };
      (globalThis.fetch as any).mockResolvedValueOnce(mockResponse);

      const result = GetUsersServices();

      expect(result).toBeInstanceOf(Promise);
    });

    it('should resolve with UserDataType array', async () => {
      const mockResponse = {
        ok: true,
        json: async () => mockUsers,
      };
      (globalThis.fetch as any).mockResolvedValueOnce(mockResponse);

      const result = await GetUsersServices();

      expect(Array.isArray(result)).toBe(true);
      expect(result.every((user) => typeof user === 'object')).toBe(true);
    });

    it('should be awaitable', async () => {
      const mockResponse = {
        ok: true,
        json: async () => mockUsers,
      };
      (globalThis.fetch as any).mockResolvedValueOnce(mockResponse);

      const result = await GetUsersServices();

      expect(result).toBeDefined();
    });
  });
});
