from fastapi import FastAPI, Request
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS 设置，允许前端访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 情绪识别 pipeline（使用 HuggingFace Transformers 模型）
emotion_classifier = pipeline("text-classification", model="nateraw/bert-base-uncased-emotion")

class TextInput(BaseModel):
    text: str

@app.post("/analyze")
async def analyze_emotion(input: TextInput):
    result = emotion_classifier(input.text)
    top = result[0]  # 取置信度最高的一项
    return {"label": top['label'], "score": round(top['score'], 3)}
