# CLAUDE.md — SAVE POINT 存檔點

這份文件是給 AI 助理（以及未來的我）看的專案規則。
**任何對本專案的新增或修改，都必須遵守這份文件。** 如果規則跟使用者當下的明確指示衝突，以使用者指示為準，並提醒使用者是否要回頭更新本文件。

與使用者溝通一律使用**繁體中文**。

---

## 1. 專案目的與目標讀者

- **網站名稱**：`SAVE POINT 存檔點`（repo：`save-point`，網址：`https://jerryzx7.github.io/save-point/`）。
- **目的**：一個記錄「我玩過的遊戲」的個人網站，涵蓋主機遊戲（PS4 / PS5 / Switch / Xbox）與電腦遊戲（PC）。每款遊戲有一頁自己的心得，首頁是卡片牆，另有統計頁。
- **目標讀者**：
  1. 我自己 —— 回顧玩過什麼、花了多少時間、當時的感受。
  2. 朋友 / 同學 —— 想找下一款遊戲時，參考我的評分和「推薦給誰」。
- **網站性質**：個人紀錄，**所有數字與心得都是我本人的真實資料**（見第 8 節規則）。
- **技術**：Jekyll，由 GitHub Pages 原生建置，**不使用 GitHub Actions、不使用 npm / 前端框架**。只用 HTML + Liquid + 純 CSS + 少量原生 JavaScript。

---

## 2. 視覺風格：暗色系「遊戲主機選單」

整體感覺參考 PS5 / Switch 主選單：深色背景、一排排**遊戲封面**，封面後方有 **Ambient Light（背光燈）效果** —— 封面的顏色像電視背光一樣暈染到周圍。被選取（hover / focus）的卡片會浮起、光暈變亮。

### 2.1 CSS 變數（定義在 `assets/css/style.css` 的 `:root`）

| 變數 | 值 | 用途 |
|---|---|---|
| `--color-primary` | `#4f8cff` | 主色：連結、導覽列目前頁面、主要按鈕 |
| `--color-accent` | `#00e0b8` | 強調色：評分數字、篩選按鈕選取狀態、focus 外框 |
| `--color-bg` | `#0b0e14` | 頁面背景 |
| `--color-surface` | `#151a23` | 卡片、區塊底色 |
| `--color-surface-2` | `#1e2532` | 次一層底色（hover、表格斑馬紋、防雷區塊） |
| `--color-border` | `#2a3242` | 一般邊框、分隔線 |
| `--color-text` | `#e6e9ef` | 主要文字 |
| `--color-text-muted` | `#8a93a6` | 次要文字（日期、標籤、說明） |
| `--status-playing` | `#4f8cff` | 狀態徽章：遊玩中 |
| `--status-cleared` | `#3ddc84` | 狀態徽章：已破關 |
| `--status-platinum` | `#f5c542` | 狀態徽章：全成就 |
| `--status-dropped` | `#ff5c6c` | 狀態徽章：棄坑 |
| `--radius` | `12px` | 卡片與區塊圓角 |
| `--game-color` | （每款遊戲覆寫） | 該遊戲的 `theme_color`，預設 `var(--color-primary)` |

### 2.2 字體

- 透過 Google Fonts 載入（寫在 `_includes/head.html`）：
  - **標題、數字、平台名稱**：`"Rajdhani", "Noto Sans TC", sans-serif`（有遊戲 UI 的方正科技感）
  - **內文**：`"Noto Sans TC", system-ui, sans-serif`
- 數字（時數、評分、統計）使用 `font-variant-numeric: tabular-nums`，對齊比較整齊。

### 2.3 卡片樣式（首頁卡片牆）

- 底色 `--color-surface`，圓角 `--radius`。
- **2px 邊框使用該遊戲的 `theme_color`**（平常以較低透明度呈現，選取時完全不透明）。
- 卡片上方是**封面區**，比例 `3 / 4`（直式盒裝封面），`object-fit: cover`：
  - **有 `cover` 欄位**：顯示 `assets/covers/` 裡的封面圖。
  - **沒有 `cover`**：自動改用「文字封面」—— `theme_color` 漸層背景＋大字標題。
- **Ambient Light 光暈**（寫在 `_includes/game-card.html` 與 CSS 的 `.ambient` 類別）：
  - 有封面：封面後方放一張**同一張圖**的複本，`filter: blur(28px) saturate(1.6)`、放大約 1.15 倍、`opacity: .55`，讓封面顏色暈到卡片外。
  - 沒封面：改用 `radial-gradient` 的 `--game-color` 光暈。
- hover / focus：`transform: translateY(-6px) scale(1.02)`，光暈 `opacity` 提高到 `.9`，邊框變為不透明 `--game-color`，模擬主機選單「選取中」效果。
- 卡片內顯示：標題、平台、狀態徽章、遊玩時數、評分。
- 整張卡片是一個連結，可用鍵盤 Tab 選取。

### 2.4 `theme_color` 的使用方式

每款遊戲在 front matter 設定 `theme_color`，layout 會用 inline style 注入 CSS 變數：

```html
<article class="game-card" style="--game-color: {{ game.theme_color }}">
```

`--game-color` 用在：
1. 首頁卡片的邊框、左側色條、文字封面漸層、hover 光暈。
2. 遊戲詳細頁的**標題列**背景（漸層）與標題下方的分隔線。詳細頁標題列左側放封面（同樣有 Ambient Light），標題列背景是封面的大面積模糊版本；沒有封面就用 `theme_color` 漸層。

選色原則：取該遊戲給人的代表色（例如紅色系的西部、霓虹色的都市），但要確保白字在上面看得清楚（偏深或中等亮度的顏色）。**選色前要先問使用者有沒有偏好**，沒有偏好才由 AI 提議並說明理由。

### 2.5 響應式（手機版）

- 卡片牆使用 `grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))`，手機自動變一欄。
- 寬度 ≤ 640px 時：導覽列縮成一行可橫向捲動、頁面左右留白 16px、標題字級縮小。
- 不允許整頁出現水平捲軸。

---

## 3. 資料夾結構

```
my-game-log/
├── CLAUDE.md              # 本文件：AI 與人共同遵守的規則（不會被發布到網站）
├── README.md              # 專案說明（不會被發布到網站）
├── _config.yml            # Jekyll 設定：網站名稱、baseurl、collections、預設 layout
├── Gemfile                # 本機預覽用（github-pages gem），GitHub Pages 上不需要
├── .gitignore             # 排除 _site/、vendor/ 等建置產物
├── _games/                # ★ 每款遊戲一個 Markdown 檔（新增遊戲只動這裡）
│   ├── _template.md       #   新增遊戲用的範本（底線開頭，不會被發布）
│   └── <slug>.md
├── _layouts/
│   ├── default.html       # 全站外框：head、導覽列、footer
│   └── game.html          # 遊戲詳細頁：標題列、資訊面板、內文、截圖
├── _includes/
│   ├── head.html          # <head>：meta、字體、CSS
│   ├── header.html        # 導覽列
│   ├── footer.html        # 頁尾
│   ├── game-card.html     # 首頁的單張遊戲卡片
│   └── status-badge.html  # 狀態徽章（首頁與詳細頁共用）
├── assets/
│   ├── css/style.css      # 全站唯一的樣式表（純 CSS）
│   ├── js/filter.js       # 首頁狀態篩選（原生 JS）
│   ├── covers/            # 遊戲封面圖（使用者自行下載提供），檔名 <slug>.jpg / .png / .webp
│   └── screenshots/
│       └── <slug>/        # 使用者自己提供的截圖，一款遊戲一個資料夾
├── index.html             # 首頁：遊戲卡片牆 + 狀態篩選
├── stats.html             # 統計頁：全部由 Liquid 從 _games 計算
└── about.md               # 關於本站
```

- `_config.yml` 中 `exclude` 必須包含 `CLAUDE.md`、`README.md`、`Gemfile`、`Gemfile.lock`，避免被發布。
- 遊戲頁網址：`/games/<slug>/`（由 `_config.yml` 的 collection `permalink: /games/:name/` 決定，所以**檔名就是網址**）。
- 站內所有連結與資源路徑都必須經過 `relative_url` filter，例如 `{{ '/assets/css/style.css' | relative_url }}`、`{{ game.url | relative_url }}`，否則部署到 GitHub Pages 的子路徑會壞掉。

---

## 4. 遊戲檔 front matter 規格

`layout` **不要**寫在遊戲檔裡，已由 `_config.yml` 的 `defaults` 統一指定為 `game`。

| 欄位 | 必填 | 型別 | 允許值 / 格式 | 範例 |
|---|---|---|---|---|
| `title` | ✅ | 字串 | 遊戲正式名稱，使用使用者習慣的寫法（中文或英文皆可） | `"Red Dead Redemption 2"` |
| `slug` | ✅ | 字串 | 英文小寫 kebab-case，**必須和檔名（去掉 `.md`）完全相同** | `red-dead-redemption-2` |
| `platform` | ✅ | 字串 | 只能是 `PS4`、`PS5`、`PC`、`Switch`、`Xbox` 其中之一（大小寫要一致）。填「我實際玩的平台」 | `PS4` |
| `genre` | ✅ | 字串 | 主要類型，一個就好，中文 | `"開放世界動作冒險"` |
| `status` | ✅ | 字串 | 只能是 `遊玩中`、`已破關`、`全成就`、`棄坑` 其中之一 | `已破關` |
| `start_date` | 選填 | 字串（加引號） | `"YYYY-MM-DD"`、`"YYYY-MM"` 或 `"YYYY"`；只記得到哪就寫到哪，**不可自己補日或月** | `"2019-11"` |
| `finish_date` | 選填 | 字串（加引號） | 同上。`status` 為 `遊玩中` 時**不可填** | `"2020-02-14"` |
| `hours` | ✅ | 數字 | ≥ 0，整數或小數一位，不加引號、不加單位。包含線上模式等所有時數的**總和** | `120` |
| `hours_note` | 選填 | 字串 | 時數拆分說明，顯示在遊戲頁資訊面板（例如單機與線上分開） | `"單機 50 小時＋線上 100 小時"` |
| `completion` | ✅ | 整數 | 0–100 的整數，代表**主線劇情進度**（不是遊戲內的全收集 %），不寫 `%`。`已破關`、`全成就` 必須是 `100` | `85` |
| `rating` | 選填* | 數字 | 0–10，最多小數一位，不加引號。*`遊玩中` 可暫不評分；其他狀態都要填 | `9.5` |
| `theme_color` | ✅ | 字串（加引號） | `"#RRGGBB"` 六碼 hex（引號必加，否則 `#` 會被 YAML 當註解） | `"#8b1e1e"` |
| `one_liner` | ✅ | 字串 | 一句話心得，**30 字以內**，會顯示在卡片和詳細頁 | `"慢到讓人生氣，美到讓人原諒。"` |
| `recommend_for` | 選填 | 字串陣列 | 推薦對象的短標籤，每個 12 字以內 | `["喜歡慢節奏敘事的人", "西部片迷"]` |
| `tags` | 選填 | 字串陣列 | 自由標籤，中文為主；同義的標籤要統一（先看既有遊戲用過哪些） | `["開放世界", "劇情向", "Rockstar"]` |
| `cover` | 選填 | 字串 | `assets/covers/` 下的檔名，只有使用者提供了圖檔才填；沒填就自動用文字封面 | `"gta-v.jpg"` |
| `cover_position` | 選填 | 字串 | CSS `object-position` 值。封面是**橫式**圖時，用來指定直式卡片要裁切保留哪一塊（例：主角在右邊就用 `"80% center"`）；直式封面不用填 | `"80% center"` |
| `screenshots` | 選填 | 字串陣列 | 只有使用者提供截圖時才填；值是 `assets/screenshots/<slug>/` 下的檔名 | `["camp.jpg", "sunset.png"]` |

### 欄位之間的一致性規則

- `status: 已破關` / `全成就` → `completion: 100`（主線已完成）。
- `status: 遊玩中` → 不填 `finish_date`。
- `status: 已破關` / `全成就` → 盡量有 `finish_date`（使用者不記得就不填，不要猜）。
- `status: 棄坑` → 可以不填 `finish_date`；`one_liner` 或內文中建議說明棄坑原因（問使用者）。
- 選填欄位沒有資料時，**整行刪掉**，不要留空值（不要寫 `rating:` 或 `rating: null`）。
- 版面上缺少的數值一律顯示 `—`，由 layout 處理，遊戲檔不用管。

---

## 5. 遊戲頁內文的固定段落

front matter 之後的 Markdown 內文，**必須依照下面的順序**，使用這四個二級標題，標題文字一字不改：

```markdown
## 一句話心得

（與 front matter 的 one_liner 相同的那句話，可以再補一兩句延伸。）

## 最喜歡的時刻

（使用者描述的印象最深的時刻。若涉及劇情轉折，該段也要放進防雷區塊。）

## 劇情感想

<details class="spoiler" markdown="1">
<summary>⚠️ 含劇情雷，點擊展開</summary>

（使用者的劇情感想，Markdown 可正常使用。）

</details>

## 推薦給誰

（列出 recommend_for 的對象。只有使用者說過理由時才加上理由，不可自己替使用者想推薦理由。）
```

注意事項：
- `<details>` 一定要有 `markdown="1"`，裡面的 Markdown 才會被轉換；`<summary>` 後面和 `</details>` 前面都要**空一行**。
- 「劇情感想」**永遠**包在防雷區塊中，即使使用者說內容沒什麼雷。
- 「最喜歡的時刻」若部分內容有劇情雷（例如角色死亡、結局），把**沒雷的部分寫在外面**，有雷的部分放進該段自己的防雷區塊，`<summary>` 寫 `⚠️ 這段有劇情雷，點擊展開`。
- 使用者提供的是條列式的短句時，內文就用條列呈現，不要擴寫成長篇文章；可以修正錯字、統一標點，但不可加入使用者沒說過的內容。
- 使用者沒提供某一段的內容時：先問；使用者明確說「這段先空著」，就在該段寫 `（待補）`，不要自己寫。
- 不要在這四段之外新增其他標題。截圖由 layout 根據 `screenshots` 欄位自動顯示，不用寫在內文。

---

## 6. 命名規則

- **檔名 = slug = 英文小寫 kebab-case**：`_games/<slug>.md`。
  - 只用 `a-z`、`0-9`、`-`；不用空白、底線、中文、大寫。
  - 去掉標點與所有格：`Marvel's Spider-Man` → `marvels-spider-man`。
  - 數字續作用阿拉伯數字：`Red Dead Redemption 2` → `red-dead-redemption-2`；`Grand Theft Auto V` → `gta-v`（使用者習慣叫的縮寫可以直接用，但要先確認）。
  - 同一系列不同版本要能區分：`the-last-of-us-part-2`、`god-of-war-ragnarok`。
- 截圖資料夾：`assets/screenshots/<slug>/`，截圖檔名也用小寫 kebab-case（例：`final-boss.jpg`）。
- 新增前先檢查 `_games/` 裡**沒有重複的 slug**。

---

## 7. 「新增一款遊戲」SOP

### 步驟

1. **讀規則**：先讀本文件第 4、5、6、8 節。
2. **看現況**：列出 `_games/` 既有檔案，確認沒有同一款遊戲；瀏覽既有 `tags`、`genre` 用詞，新遊戲沿用相同寫法。
3. **收集資料**：對照第 4 節表格，把使用者已提供的資料填進去。**所有缺少的必填欄位與內文段落，一次整理成清單問使用者**，例如：

   > 還缺這些資料，請補充（不想填的選填欄位可以說「略過」）：
   > - 平台：PS4 / PS5 / PC / Switch / Xbox？
   > - 遊玩時數？
   > - 完成度（0–100）？
   > - 評分（0–10）？
   > - 最喜歡的時刻？
   > - 劇情感想？
   > - theme_color：有想要的顏色嗎？沒有的話我提議 `#xxxxxx`（理由…）
   >
   > 開始 / 破關日期記得的話也可以給我（只記得年份也可以）。

   使用者回覆前**不要建立檔案**。
4. **決定 slug**：依第 6 節產生 slug，若有疑慮（縮寫、副標題）向使用者確認。
5. **建立檔案**（使用者若用選擇題回答，選項本身就是使用者的答案；但 AI 提供的選項只能是「整理使用者原話」或客觀事實，不能替使用者編感想）：複製 `_games/_template.md` 為 `_games/<slug>.md`，填入 front matter 與四段內文。
   - 可以替使用者**潤飾文字的錯字與通順度**，但不可改變意思、不可加入使用者沒說過的經歷或評價。
6. **封面與截圖（若有）**：
   - 封面：確認使用者已把圖放在 `assets/covers/`（建議檔名 `<slug>.jpg`），在 `cover` 欄位填檔名。**AI 不自行上網下載圖片**；沒有圖就不填 `cover`，告訴使用者可以之後補。
   - 截圖：放到 `assets/screenshots/<slug>/`，並在 `screenshots` 欄位列出檔名。
7. **建置檢查**：執行 `bundle exec jekyll build`，確認沒有錯誤，並檢查 `_site/games/<slug>/index.html` 有產生。
   - 本機需要 **Ruby 3.x（不能是 4.0，github-pages gem 不支援）**。這台 Mac 用 Homebrew 的 `ruby@3.3`：先執行 `export PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH"`。
8. **回報**：告訴使用者新增了哪個檔案、填了哪些欄位、哪些欄位因為沒資料而留空。

### 完成後檢查清單

- [ ] 檔名、`slug` 一致，且是小寫 kebab-case。
- [ ] 所有必填欄位都有，值都在允許範圍內（`platform`、`status` 拼字完全符合）。
- [ ] `hours`、`completion`、`rating` 是數字、沒有引號；`theme_color`、日期有引號。
- [ ] 欄位一致性規則都符合（全成就 = 100%、遊玩中沒有 finish_date…）。
- [ ] 每一個數字與心得都能對應到使用者說過的話，**沒有任何捏造**。
- [ ] 內文四個標題順序正確、文字一字不差。
- [ ] 「劇情感想」在 `<details class="spoiler" markdown="1">` 裡；其他段落若有劇情雷也已包起來。
- [ ] `cover` 有填的話，`assets/covers/` 裡確實有這個檔案（檔名、副檔名完全一致）；沒有外連任何網路圖片。
- [ ] 沒有修改 `_layouts/`、`_includes/`、`assets/css/`、`assets/js/`、`index.html`、`stats.html`。
- [ ] 沒有手動改任何統計數字（首頁與統計頁會自動更新）。
- [ ] `jekyll build` 成功（若本機可執行）。

---

## 8. AI 必須遵守的規則

1. **個人資料絕不捏造**：遊玩時數、完成度、評分、日期、心得、最喜歡的時刻、劇情感想、推薦對象，全部只能來自使用者。缺資料就問，不能「先填一個合理的值」。不確定使用者的意思時也要問。
2. **劇情內容一律防雷**：任何劇情細節（轉折、結局、角色生死、真實身分）都只能出現在 `<details class="spoiler">` 區塊內。`one_liner`、`recommend_for`、`tags`、卡片文字中不可含劇情雷。
3. **圖片只用使用者提供的檔案**：官方封面可以使用，但**必須是使用者自己下載並放進 `assets/covers/` 的檔案**；AI 不可自行上網抓圖，也不可外連（hotlink）任何網路圖片。截圖放在 `assets/screenshots/<slug>/`。網站頁尾必須保留「遊戲封面版權屬於各原廠商，本站僅作個人紀錄使用」的聲明。沒有圖片的遊戲用 `theme_color` 文字封面代替。
4. **新增遊戲時只動 `_games/`（與截圖資料夾）**：不可修改 `_layouts/`、`_includes/`、`assets/css/`、`assets/js/`、`_config.yml`、`index.html`、`stats.html`，除非使用者明確要求。若發現版面需要調整才能呈現新資料，先告訴使用者，等同意再改。
5. **統計數字自動產生**：首頁與統計頁的所有數字（遊戲數、總時數、平均評分、各平台 / 各狀態數量）都必須用 Liquid 從 `site.games` 計算，**不准手動寫死數字**，也不要在 `about.md` 或 README 寫具體的遊戲數量或時數。
6. **只用 GitHub Pages 支援的東西**：不新增 GitHub Pages 白名單以外的 Jekyll plugin，不引入需要建置的前端框架（React、Vue、Tailwind 建置版、npm 套件等）。需要互動就寫原生 JS。
7. **路徑一律用 `relative_url`**：任何站內連結、CSS、JS、圖片路徑都要經過 `| relative_url`。
8. **規則有疑問先問**：如果這份文件沒涵蓋到的情況，先問使用者；決定後建議把新規則補進本文件。

---

## 9. 未來可延伸方向與擴充方式

### 可能的延伸

| 功能 | 做法建議 |
|---|---|
| **年度回顧頁** `/year/` | 新增 `year.html`，用 `site.games | group_by_exp: "g", "g.finish_date | slice: 0, 4"` 依破關年份分組，每年顯示破關數、總時數、最高分遊戲。 |
| **標籤頁** `/tags/` | 新增 `tags.html`，收集所有遊戲的 `tags`、`uniq` 後列出，每個標籤一個錨點區塊（`#tag-開放世界`）。**不要用 jekyll-archives**（GitHub Pages 不支援）。 |
| **平台頁** | 同標籤頁做法，用 `where: "platform", "PS5"` 篩選。 |
| **首頁排序 / 搜尋** | 擴充 `assets/js/filter.js`，卡片上已有 `data-*` 屬性可用。 |
| **「想玩清單」** | 若要記錄還沒玩的遊戲，**不要**塞進 `status`；應該另開一個 collection（例如 `_wishlist/`），避免污染統計。 |

### 擴充時的流程

1. 先跟使用者確認需求，並說明會動到哪些檔案。
2. **新增欄位**：先更新本文件第 4 節表格（標明必填 / 選填），再更新 `_games/_template.md`，最後才改 layout。新欄位一律先設為**選填**，這樣舊的遊戲檔不用全部補資料也不會壞。
3. **新增頁面**：放在專案根目錄，`layout: default`，資料只從 `site.games` 計算；並在 `_includes/header.html` 導覽列加連結。
4. **新增樣式**：只寫在 `assets/css/style.css`，沿用第 2 節的 CSS 變數，不另外寫死色碼。
5. 改完執行 `bundle exec jekyll build` 確認無誤，並回頭更新本文件第 3 節資料夾結構與本節。
