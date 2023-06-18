import axios from "axios";
import { IndiceData, DailyChangeData } from "../types";

const loadIndiceData = async (indices: string): Promise<IndiceData> => {
  const url = process.env.SECURITIES_URL || "";
  const result = await axios(url, { params: { symbols: indices }});

  return result.data.data;
}

export const extractDailyChange = async (): Promise<DailyChangeData[]> => {
  try {
    const symbols = `FTSE:FSI,INX:IOM,EURUSD,GBPUSD,IB.1:IEU`;
    const { items } = await loadIndiceData(symbols);

    return items.map((item: any) => {
      const symbol = item.basic.name;
      const priceDiff = item.quote.change1DayPercent.toFixed(2);

      return { symbol, priceDiff }
    })
  } catch (error: any) {
    throw error;
  }
}
