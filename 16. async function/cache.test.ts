import { describe, it, expect, beforeEach, vi } from "vitest";
import { fetchWithCache, cache } from "./cache";

// fetch와 Date.now()를 모킹합니다
global.fetch = vi.fn();
const mockDateNow = vi.spyOn(Date, "now");

describe("fetchWithCache", () => {
  beforeEach(() => {
    // 각 테스트 전에 캐시와 모킹을 초기화합니다
    cache.clear();
    vi.clearAllMocks();
  });

  it("캐시가 없을 때 fetch를 호출하고 데이터를 저장해야 합니다", async () => {
    const mockData = { id: 1, name: "Test" };
    const mockResponse = {
      json: vi.fn().mockResolvedValue(mockData),
    };

    (global.fetch as any).mockResolvedValueOnce(mockResponse);
    mockDateNow.mockReturnValueOnce(1000);

    const result = await fetchWithCache("https://api.example.com/data");

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("https://api.example.com/data");
    expect(result).toEqual(mockData);
    expect(cache.has("https://api.example.com/data")).toBe(true);
  });

  it("FRESH_TIME(5초) 미만일 때 캐시된 데이터를 즉시 반환해야 합니다", async () => {
    const mockData = { id: 1, name: "Test" };
    const initialTime = 1000;

    // 초기 캐시 설정
    cache.set("https://api.example.com/data", {
      data: mockData,
      timestamp: initialTime,
    });

    // 3초 후 (FRESH_TIME 미만)
    mockDateNow.mockReturnValueOnce(initialTime + 3000);

    const result = await fetchWithCache("https://api.example.com/data");

    expect(result).toEqual(mockData);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("TOTAL_CACHE_TIME(10초) 미만일 때 stale 데이터를 반환하고 백그라운드에서 fetch해야 합니다", async () => {
    const staleData = { id: 1, name: "Stale" };
    const newData = { id: 2, name: "New" };
    const initialTime = 1000;

    // 초기 캐시 설정
    cache.set("https://api.example.com/data", {
      data: staleData,
      timestamp: initialTime,
    });

    const mockResponse = {
      json: vi.fn().mockResolvedValue(newData),
    };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    // 7초 후 (FRESH_TIME 이상, TOTAL_CACHE_TIME 미만)
    mockDateNow.mockReturnValueOnce(initialTime + 7000);

    const result = await fetchWithCache("https://api.example.com/data");

    // stale 데이터가 즉시 반환되어야 합니다
    expect(result).toEqual(staleData);

    // 백그라운드에서 fetch가 호출되어야 합니다
    // Promise가 완료될 때까지 기다립니다
    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(global.fetch).toHaveBeenCalledTimes(1);
    // 캐시가 업데이트되었는지 확인합니다
    const cached = cache.get("https://api.example.com/data");
    expect(cached?.data).toEqual(newData);
  });

  it("TOTAL_CACHE_TIME(10초) 이상일 때 새로운 fetch를 호출해야 합니다", async () => {
    const oldData = { id: 1, name: "Old" };
    const newData = { id: 2, name: "New" };
    const initialTime = 1000;

    // 초기 캐시 설정
    cache.set("https://api.example.com/data", {
      data: oldData,
      timestamp: initialTime,
    });

    const mockResponse = {
      json: vi.fn().mockResolvedValue(newData),
    };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    // 11초 후 (TOTAL_CACHE_TIME 이상)
    mockDateNow.mockReturnValueOnce(initialTime + 11000);

    const result = await fetchWithCache("https://api.example.com/data");

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(newData);
    expect(cache.get("https://api.example.com/data")?.data).toEqual(newData);
  });

  it("같은 URL로 여러 번 호출해도 캐시가 적절히 동작해야 합니다", async () => {
    const mockData = { id: 1, name: "Test" };
    const mockResponse = {
      json: vi.fn().mockResolvedValue(mockData),
    };

    (global.fetch as any).mockResolvedValue(mockResponse);
    const initialTime = 1000;
    mockDateNow.mockReturnValue(initialTime);

    // 첫 번째 호출
    const result1 = await fetchWithCache("https://api.example.com/data");
    expect(result1).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // 2초 후 두 번째 호출 (FRESH_TIME 미만)
    mockDateNow.mockReturnValue(initialTime + 2000);
    const result2 = await fetchWithCache("https://api.example.com/data");
    expect(result2).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledTimes(1); // 여전히 1번만 호출됨
  });
});





