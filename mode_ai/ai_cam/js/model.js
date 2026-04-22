class GestureModel {
    constructor() {
        this.model = null;
        this.labels = [];
        this.isBuilt = false;
    }

    async loadModel(folderPath) {
        this.model = await tf.loadLayersModel(folderPath + '/model.json');

        const response = await fetch(folderPath + '/metadata.json');
        const meta = await response.json();

        this.labels = meta.labels;

        this.model.compile({
            optimizer: tf.train.adam(0.001),
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy']
        });

        this.isBuilt = true;
    }

    async predict(landmarks) {
        if (!this.isBuilt || landmarks?.length !== 42) return null;

        const input = tf.tensor2d([landmarks]);
        try {
            const prediction = this.model.predict(input);
            const probs = await prediction.data();
            prediction.dispose();

            let maxProb = 0, maxIdx = 0;
            for (let i = 0; i < probs.length; i++) {
                if (probs[i] > maxProb) {
                    maxProb = probs[i];
                    maxIdx = i;
                }
            }

            return {
                label: this.labels[maxIdx],
                confidence: maxProb,
                probabilities: this.labels.map((l, i) => ({
                    label: l,
                    probability: probs[i]
                }))
            };
        } finally {
            input.dispose();
        }
    }
}

window.GestureModel = GestureModel;