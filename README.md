# 抽獎雷達公開前台

GitHub Pages 靜態前台，只包含公開活動資料與瀏覽介面。完整網站與登入、投稿、回報服務位於 https://choujiang-radar.catdontbiteme.chatgpt.site 。私人主專案、資料庫與憑證不在此儲存庫。

發布流程從公開 `/api/giveaways` 取得活動，只輸出明確允許的公開欄位。每天台灣時間 09:30 同步（GitHub 排程可能延遲），也可從 Actions 手動發布。同步失敗時不部署空資料，保留先前版本。

網站內的獎品圖片是類別示意，不是官方獎品照片。
