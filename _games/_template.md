---
# 新增遊戲時複製本檔為 _games/<slug>.md，規格見 CLAUDE.md 第 4、5 節。
# 選填欄位沒有資料就整行刪掉；所有數字與心得都必須來自使用者，不可捏造。
title: "遊戲名稱"
slug: game-slug
platform: PS5            # PS4 / PS5 / PC / Switch / Xbox
genre: "類型"
status: 遊玩中            # 遊玩中 / 已破關 / 全成就 / 棄坑
start_date: "YYYY-MM-DD" # 選填，可只寫 "YYYY" 或 "YYYY-MM"
finish_date: "YYYY-MM-DD" # 選填，遊玩中不可填
hours: 0                 # 所有時數總和（含線上模式）
hours_note: "單機 X 小時＋線上 Y 小時" # 選填
completion: 0            # 主線進度 0-100；已破關/全成就 = 100
rating: 0.0              # 選填（遊玩中可略），0-10，小數一位
theme_color: "#4f8cff"
cover: "game-slug.jpg"   # 選填，檔案放 assets/covers/
cover_position: "80% center" # 選填，只有橫式封面需要
one_liner: "30 字以內的一句話心得"
recommend_for: ["推薦對象 1", "推薦對象 2"]
tags: ["標籤 1", "標籤 2"]
screenshots: ["shot-1.jpg"] # 選填，檔案放 assets/screenshots/<slug>/
scores:                  # 選填，分項評分 0-10，缺哪項就省略
  story: 0
  gameplay: 0
  visuals: 0
  music: 0
pros: ["優點 1"]          # 選填
cons: ["缺點 1"]          # 選填
videos:                  # 選填，ID 必須先用 oEmbed 驗證（CLAUDE.md 第 8 節第 9 條）
  - id: VIDEO_ID
    title: "影片標題（頻道）"
    spoiler: true        # 劇情相關一律 true
---

## 一句話心得

（與 one_liner 相同的那句話，可再補一兩句延伸。）

## 最喜歡的時刻

（使用者印象最深的時刻。有劇情雷就包進防雷區塊。）

## 劇情感想

<details class="spoiler" markdown="1">
<summary>⚠️ 含劇情雷，點擊展開</summary>

（使用者的劇情感想。）

</details>

## 推薦給誰

（列出 recommend_for；只有使用者說過理由才寫理由。）
