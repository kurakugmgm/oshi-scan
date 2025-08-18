// ファイル: /components/TokenAnalyticsDashboard.js
import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip as PieTooltip, ResponsiveContainer as PieContainer } from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip, ResponsiveContainer as LineContainer } from "recharts";

const COLORS = ["#4F46E5", "#6366F1", "#818CF8", "#A5B4FC", "#C7D2FE"];

export default function TokenAnalyticsDashboard() {
  const [loading, setLoading] = useState(false);
  const [holderData, setHolderData] = useState([]);
  const [holderTrend, setHolderTrend] = useState([]);
  const [relatedTokens, setRelatedTokens] = useState([]);
  const [relatedNFTs, setRelatedNFTs] = useState([]);
  const [gptComment, setGptComment] = useState("");
  const [chain, setChain] = useState("polygon");
  const [type, setType] = useState("erc20");
  const [tokenAddress, setTokenAddress] = useState("");

  const fetchDummyData = () => {
    if (!tokenAddress) return alert("トークンアドレスを入力してください。");
    setLoading(true);
    setTimeout(() => {
      setHolderData([
        { name: "0xabc...1", value: 22 },
        { name: "0xdef...2", value: 18 },
        { name: "0xghi...3", value: 15 },
        { name: "0xjkl...4", value: 12 },
        { name: "0xmn0...5", value: 10 },
        { name: "Others", value: 23 },
      ]);
      setHolderTrend([
        { week: "2024-W01", holders: 120 },
        { week: "2024-W02", holders: 138 },
        { week: "2024-W03", holders: 150 },
        { week: "2024-W04", holders: 160 },
        { week: "2024-W05", holders: 180 },
      ]);
      setRelatedTokens([
        { name: "Aave", contract: "0x123...aaa" },
        { name: "Uniswap", contract: "0x456...bbb" },
        { name: "Lens Protocol", contract: "0x789...ccc" },
      ]);
      setRelatedNFTs([
        { name: "Zapper SBT", collection: "Zapper" },
        { name: "Guild NFT", collection: "Guild.xyz" },
        { name: "POAP NFT", collection: "POAP" },
      ]);
      setGptComment("OSHI保有者はDeFi・SBT系に偏りがある傾向です。");
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">OSHIスキャン簡易版</h1>

      <div className="mb-4 space-y-2">
        <div>
          <label className="font-medium mr-2">チェーン:</label>
          <select value={chain} onChange={(e) => setChain(e.target.value)} className="border p-1 rounded">
            <option value="polygon">Polygon</option>
            <option value="ethereum">Ethereum</option>
            <option value="solana">Solana</option>
          </select>
        </div>
        <div>
          <label className="font-medium mr-2">アセット種別:</label>
          <label className="mr-4">
            <input type="radio" value="erc20" checked={type === 'erc20'} onChange={() => setType('erc20')} className="mr-1" />
            トークン（ERC20）
          </label>
          <label>
            <input type="radio" value="nft" checked={type === 'nft'} onChange={() => setType('nft')} className="mr-1" />
            NFT
          </label>
        </div>
        <div>
          <label className="font-medium mr-2">トークンアドレス:</label>
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="0x..."
            className="border p-1 rounded w-full"
          />
        </div>
      </div>

      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded"
        onClick={fetchDummyData}
        disabled={loading}
      >
        {loading ? "読み込み中..." : "分析スタート"}
      </button>

      {holderData.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mt-6 mb-2">上位ホルダー保有割合</h2>
          <PieContainer width="100%" height={300}>
            <PieChart>
              <Pie data={holderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {holderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <PieTooltip />
            </PieChart>
          </PieContainer>

          <h2 className="text-lg font-semibold mt-6 mb-2">保有者数の推移</h2>
          <LineContainer width="100%" height={300}>
            <LineChart data={holderTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <LineTooltip />
              <Line type="monotone" dataKey="holders" stroke="#4F46E5" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </LineContainer>

          <h2 className="text-lg font-semibold mt-6 mb-2">関連トークン</h2>
          <ul className="list-disc list-inside">
            {relatedTokens.map((t, i) => <li key={i}>{t.name} - {t.contract}</li>)}
          </ul>

          <h2 className="text-lg font-semibold mt-6 mb-2">関連NFT</h2>
          <ul className="list-disc list-inside">
            {relatedNFTs.map((n, i) => <li key={i}>{n.name} ({n.collection})</li>)}
          </ul>

          <h2 className="text-lg font-semibold mt-6 mb-2">AIコメント</h2>
          <p className="text-gray-700 text-sm whitespace-pre-line">{gptComment}</p>
        </>
      )}
    </div>
  );
}
