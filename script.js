// 欠席通知とAI分析機能を含む次世代JavaScript

async function sendAbsenceNotification() {
    const studentName = document.getElementById("student-name").value;
    const className = document.getElementById("class").value;
    const absenceDate = document.getElementById("absence-date").value;
    const reason = document.getElementById("reason").value;

    if (studentName && className && absenceDate && reason) {
        alert(`${studentName}さんの欠席連絡が送信されました。`);

        // 欠席理由の自動分類
        const response = await analyzeReasonWithAI(reason);

        // ダッシュボードへのデータ送信
        await sendToDashboard({
            studentName,
            className,
            absenceDate,
            reason,
            category: response.category
        });

        document.getElementById("confirmation").classList.remove("hidden");
        document.getElementById("absence-form").reset();
    } else {
        alert("全ての項目を記入してください。");
    }
}

// 欠席理由のAIによる分析
async function analyzeReasonWithAI(text) {
    return { category: text.includes("病気") ? "病気" : "その他" };
}

// 仮のダッシュボード送信
async function sendToDashboard(data) {
    console.log("Dashboard data:", data);
}

// 音声入力の起動 (Web Speech APIを使用した例)
function activateVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'ja-JP';

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById("reason").value = transcript;
        alert("音声認識完了：" + transcript);
    };

    recognition.start();
}
