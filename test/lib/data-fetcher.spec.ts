import axios, { AxiosResponse } from 'axios';
import { extractDailyChange } from '../../src/lib';

jest.mock("axios");
const mAxios = axios as jest.MockedFunction<typeof axios>

afterEach(() => {
  jest.clearAllMocks()
})

describe("extractDailyChange", () => {
  describe("when API call is successful", () => {
    it("should return last day price change", async () => {
      const mockResponse = {
        data: {
          data: {
            items: [
              {
                basic: {
                  name: "S&P 500 INDEX"
                },
                quote: {
                  change1DayPercent: 0.36716193988033907
                }
              }
            ]
          }
        },
        status: 200,
        statusText: 'ok'
      } as AxiosResponse;

      mAxios.mockResolvedValueOnce(mockResponse);

      const result = await extractDailyChange();

      expect(result).toEqual([{ symbol: 'S&P 500 INDEX', priceDiff: '0.37' }])
    })
  })

  it("should throw an error if unable to fetch last day price change data", async () => {
    mAxios.mockRejectedValueOnce(`Error extracting daily change data`);

    try {
      await extractDailyChange()
    } catch (error) {
      expect(error).toBe(`Error extracting daily change data`)
    }
  })
})