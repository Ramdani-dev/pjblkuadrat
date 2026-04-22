class LSTMPredictor {
    constructor() {
        this.model = null;
        this.windowSize = 5;
        this.isReady = false;
        this.playerData = [];
        this.roundCount = 0;
        this.modelPath = 'js/model/model.json';
    }

    async loadModel() {
        try {
            this.model = await tf.loadLayersModel(this.modelPath);
            this.model.compile({
                optimizer: 'adam',
                loss: 'sparseCategoricalCrossentropy',
                metrics: ['acc']
            });
            this.isReady = true;
            console.log('[LSTM] Model berhasil dimuat dari file.');
            return true;
        } catch (err) {
            console.error('[LSTM] Gagal memuat model:', err);
            return false;
        }
    }

    addPlayerData(history, nextChoice) {
        if (history.length === this.windowSize) {
            this.playerData.push({
                input: history.slice(),
                label: nextChoice
            });
        }
        this.roundCount++;

        if (this.roundCount % 5 === 0 && this.playerData.length >= 3) {
            this.retrain();
        }
    }

    async retrain() {
        if (!this.model || this.playerData.length < 3) return;

        const recentMoves = this.playerData.slice(-20);
        const patterns = recentMoves.map(d => d.input.map(v => [v]));
        const labels = recentMoves.map(d => d.label);

        const trainX = tf.tensor3d(patterns, [patterns.length, this.windowSize, 1], 'float32');
        const trainY = tf.tensor1d(labels, 'float32');

        try {
            await this.model.fit(trainX, trainY, {
                epochs: 50,
                batchSize: 4,
                shuffle: true
            });
        } catch (err) {}

        trainX.dispose();
        trainY.dispose();
    }

    predict(recentMoves) {
        if (!this.isReady || !this.model || recentMoves.length !== this.windowSize) return null;

        const input = tf.tensor3d([recentMoves.map(m => [m])]);
        const prediction = this.model.predict(input);

        const output = prediction.argMax(-1).dataSync()[0];

        input.dispose();
        prediction.dispose();

        const pilihan = ['batu', 'kertas', 'gunting'];
        const pilihanLawan = pilihan[output];
        const pilihanAI = pilihan[(output + 1) % 3];
        return pilihanAI;
    }
}

window.LSTMPredictor = LSTMPredictor;