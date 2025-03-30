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

  const detectEmotion = () => {
    const lowerText = text.toLowerCase();
    let detected = "relaxed";
    if (lowerText.includes("开心") || lowerText.includes("happy")) detected = "happy";
    else if (lowerText.includes("难过") || lowerText.includes("sad")) detected = "sad";
    else if (lowerText.includes("生气") || lowerText.includes("angry")) detected = "angry";
    else if (lowerText.includes("焦虑") || lowerText.includes("anxious")) detected = "anxious";

    setEmotion(detected);
    setPlaylist(emotionMap[detected]);
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
