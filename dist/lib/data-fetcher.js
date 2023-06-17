"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDailyChange = void 0;
const axios_1 = __importDefault(require("axios"));
const loadIndiceData = (indices) => __awaiter(void 0, void 0, void 0, function* () {
    const url = process.env.SECURITIES_URL || "";
    const result = yield (0, axios_1.default)(url, { params: { symbols: indices } });
    return result.data.data;
});
const extractDailyChange = () => __awaiter(void 0, void 0, void 0, function* () {
    const symbols = `FTSE:FSI,INX:IOM,EURUSD,GBPUSD,IB.1:IEU`;
    const { items } = yield loadIndiceData(symbols);
    return items.map((item) => {
        const symbol = item.basic.name;
        const priceDiff = item.quote.change1DayPercent.toFixed(2);
        return { symbol, priceDiff };
    });
});
exports.extractDailyChange = extractDailyChange;
