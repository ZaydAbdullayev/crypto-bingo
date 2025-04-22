import html2canvas from "html2canvas";

export const generateExplanation = (selected) => {
    if (selected.length === 0)
        return "You haven't sinned at all? Either you're a genius or lying 😉";

    const categories = [
        {
            label: "FOMO Beast",
            matches: [
                "Saw a pump, FOMO'd in",
                "I bought without thinking",
                "It's definitely going to moon...",
            ],
            description: "You often act on impulse and hype. FOMO might be leading your trades more than logic."
        },
        {
            label: "Stoploss Soup Chef",
            matches: [
                "I changed my stop-loss 5 times",
                "I kept lowering my stop-level",
            ],
            description: "You're struggling to stick to your plans. Emotional turbulence is shaking your discipline."
        },
        {
            label: "Signal Junkie",
            matches: [
                "I sold based on a signal guy's advice",
                "I followed shady signal groups",
            ],
            description: "You're too reliant on others. Trusting random signals is putting your portfolio at risk."
        },
        {
            label: "Revenge Trader",
            matches: [
                "I tried to take revenge on the chart",
                "I traded against the trend",
            ],
            description: "You're letting emotions get the best of you. Revenge doesn't work well in trading."
        },
        {
            label: "Leverage Lunatic",
            matches: ["I used insane leverage", "I went all-in on one coin"],
            description: "You take high risks with little safety net. It’s thrilling but often destructive."
        },
        {
            label: "Clueless Braveheart",
            matches: [
                "I didn’t even read the whitepaper",
                "I was unaware of market timings",
            ],
            description: "You’re diving in without doing your homework. Knowledge is your best weapon—use it."
        },
        {
            label: "Emotional Investor",
            matches: [
                "I bought out of greed",
                "I bought the dip, and it dipped more",
            ],
            description: "Your trades are driven by emotion. Learning to stay calm could save your wallet."
        },
        {
            label: "Spontaneous Devil",
            matches: [
                "I opened a trade because I felt like it",
                "I ignored the odds",
            ],
            description: "You're trading for fun rather than strategy. Might work once, but rarely lasts long."
        }
    ];

    const matched = categories.filter((cat) =>
        cat.matches.some((m) => selected.includes(m))
    );

    if (matched.length === 0)
        return "You're a mysterious trader. Hard to read, but probably dangerous in the shadows.";

    const explanation = matched.map((cat) => `And ${cat.description}`).join("\n\n");
    return explanation;
};

export const savePackAsImage = async (cardElement) => {

    if (!cardElement) {
        console.error("🎯 .result bulunamadı!");
        return;
    }

    try {
        const canvas = await html2canvas(cardElement, {
            scale: 2, // daha kaliteli görüntü
            useCORS: true, // harici img'ler için (örn. logo vs)
            backgroundColor: '#030303', // arka planı şeffaf yap

        });

        const dataURL = canvas.toDataURL("image/png");

        // Galeriye kaydedilsin: kullanıcıya indirme ver
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "result.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("💥 Kart görsele çevrilemedi:", error);
    }
};

