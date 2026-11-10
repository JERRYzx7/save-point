# SAVE POINT 存檔點

記錄我玩過的主機遊戲與電腦遊戲的個人網站。每款遊戲有自己的心得頁，首頁是可以依狀態篩選的封面牆，統計頁會自動計算總時數、平均評分和各平台的數量。

🔗 **網站**：<https://jerryzx7.github.io/save-point/>

## 特色

- 暗色系「遊戲主機選單」風格，封面後方有 Ambient Light（背光燈）光暈效果
- 每款遊戲有自己的主題色（`theme_color`），用在卡片邊框、光暈和遊戲頁的標題列
- 劇情感想一律收在可展開的防雷區塊
- 遊戲頁有總評圓環、分項評分（劇情／玩法／畫面／音樂）、優缺點，以及嵌入的 YouTube 影片
- 首頁 COMING SOON 區塊：還沒發售的期待作附上發售倒數和官方預告，不算進統計
- 首頁和統計頁的數字全部從遊戲資料自動計算，不用手動更新
- 手機版也能正常瀏覽

## 技術架構

| 項目 | 選擇 |
|---|---|
| 靜態網站產生器 | [Jekyll](https://jekyllrb.com/)，由 GitHub Pages 原生建置，不使用 GitHub Actions |
| 遊戲資料 | `_games/` collection，每款遊戲一個 Markdown 檔，資料寫在 front matter |
| 樣板 | Liquid（`_layouts/`、`_includes/`） |
| 樣式 | 純 CSS（`assets/css/style.css`），使用 CSS 變數 |
| 互動 | 原生 JavaScript（`assets/js/filter.js`，首頁狀態篩選） |
| 字體 | Google Fonts：Rajdhani、Noto Sans TC |
| 專案規則 | `CLAUDE.md`：給 AI 助理看的格式規格與新增 SOP |

```
_games/        每款遊戲一個 .md（_template.md 是範本）
_wishlist/     即將推出／想玩的遊戲（首頁 COMING SOON）
_layouts/      default.html（全站外框）、game.html（遊戲頁）
_includes/     head、header、footer、遊戲卡片、狀態徽章、COMING SOON、YouTube 嵌入
assets/css/    style.css
assets/js/     filter.js（狀態篩選）、countdown.js（發售倒數）
assets/covers/ 遊戲封面圖
index.html     首頁（封面牆＋篩選）
stats.html     統計頁
about.md       關於頁
CLAUDE.md      AI 協作規則
```

## 在本機預覽

需要 **Ruby 3.x**。github-pages gem 目前不支援 Ruby 4.0，macOS 內建的 Ruby 2.6 也太舊。

```bash
# 1. 安裝 Ruby 3.3（macOS + Homebrew）
brew install ruby@3.3
export PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH"

# 2. 安裝套件（裝在專案內的 vendor/，不影響系統）
bundle config set --local path vendor/bundle
bundle install

# 3. 啟動預覽伺服器
bundle exec jekyll serve
```

打開 <http://127.0.0.1:4000/save-point/>（注意網址結尾要有 `/save-point/`）。修改檔案後重新整理就會看到更新，但修改 `_config.yml` 要重新啟動伺服器。

## 用 CLAUDE.md 讓 AI 新增遊戲

`CLAUDE.md` 寫好了 front matter 欄位規格、內文段落順序、命名規則和新增 SOP。Claude Code 在這個資料夾裡會自動讀取它，所以只要用一句話描述遊戲：

> 幫我新增一款遊戲：Elden Ring，PS5，已破關，玩了 130 小時，評分 9.5，最喜歡的時刻是第一次走出寧姆格福看到黃金樹。

AI 會：

1. 依照 `CLAUDE.md` 產生 slug（`elden-ring`）並檢查有沒有重複
2. **把缺少的資料整理成清單問你**，例如完成度、劇情感想、推薦給誰、主題色。數字和心得不會自己編
3. 用 `_games/_template.md` 建立 `_games/elden-ring.md`，劇情感想自動放進防雷區塊
4. 跑一次 `jekyll build` 確認沒有錯誤，再對照檢查清單回報結果

想放封面的話，把圖檔放進 `assets/covers/`（例如 `assets/covers/elden-ring.jpg`），再告訴 AI 檔名就好。

## 版權聲明

遊戲名稱、封面與相關圖像的版權屬於各原廠商，本站僅作個人紀錄使用。
