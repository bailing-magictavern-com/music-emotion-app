import React, { useState } from "react";
import { motion } from "framer-motion";

const emotionMap = {
  happy: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC",
  sad: "https://open.spotify.com/playlist/37i9dQZF1DWVrtsSlLKzro",
  angry: "https://open.spotify.com/playlist/37i9dQZF1DWY5xidiQ2cUq",
  relaxed: "https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6",
  anxious: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO",
};

export default function Home() {
  const [text, setText] = useState("");
  const [emotion, setEmotion] = useState(null);
  const [playlist, setPlaylist] = useState(null);

  const detectEmotion = async () => {
    if (!text.trim()) return;
  
    try {
      const res = await fetch("http://localhost:8003/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }), // 发送用户输入
      });
  
      const data = await res.json();
      console.log("识别情绪：", data.label);
  
      // 映射情绪到歌单（你可以自定义对应关系）
      const emotionMap = {
        joy: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC",
        sadness: "https://open.spotify.com/playlist/37i9dQZF1DWVrtsSlLKzro",
        anger: "https://open.spotify.com/playlist/37i9dQZF1DWY5xidiQ2cUq",
        fear: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO",
        surprise: "https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6",
        neutral: "https://open.spotify.com/playlist/37i9dQZF1DWU0u5wHyUwhs",
      };
  
      setEmotion(data.label);
      setPlaylist(emotionMap[data.label] || null);
    } catch (err) {
      console.error("调用情绪识别 API 出错", err);
    }
  };
  

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', backgroundColor: '#f3f4f6' }}>
      <motion.h1 className="text-3xl font-bold mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        🎧 音乐情绪推荐
      </motion.h1>
      <div style={{ width: '100%', maxWidth: '600px', background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <input
          placeholder="输入你的心情，例如：我今天有点开心"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc', marginBottom: '1rem' }}
        />
        <button onClick={detectEmotion} style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', borderRadius: '0.5rem' }}>
          识别情绪 & 推荐音乐
        </button>
        {emotion && (
          <div style={{ marginTop: '1rem' }}>
            <p>识别到的情绪：<strong>{emotion}</strong></p>
            <a href={playlist} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>
              点此打开推荐歌单
            </a>
          </div>
        )}
      </div>
    </div>
  );
}