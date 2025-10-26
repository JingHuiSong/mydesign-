import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { prompt, aspectRatio = "1:1" } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "请输入图片描述" }, { status: 400 })
    }

    const apiKey = process.env.OPENROUTER_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "API 密钥未配置，请联系管理员" }, { status: 500 })
    }

    const response = await fetch("https://openrouter.ai/api/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "AI Poster Design Platform",
      },
      body: JSON.stringify({
        model: "black-forest-labs/flux-1.1-pro",
        prompt: prompt,
        n: 1,
        size: aspectRatio === "16:9" ? "1792x1024" : aspectRatio === "9:16" ? "1024x1792" : "1024x1024",
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: "图片生成失败，请稍后重试或联系客服" }, { status: response.status })
    }

    const data = await response.json()
    const imageUrl = data.data?.[0]?.url

    if (!imageUrl) {
      return NextResponse.json({ error: "未能生成图片，请重试" }, { status: 500 })
    }

    return NextResponse.json({ imageUrl })
  } catch (error) {
    return NextResponse.json({ error: "服务器错误，请稍后重试" }, { status: 500 })
  }
}
