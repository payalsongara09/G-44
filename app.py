from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import joblib
import pandas as pd
from pathlib import Path

app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models" / "career_model.pkl"
INFO_PATH = BASE_DIR / "models" / "model_info.pkl"

# Load model
model = joblib.load(MODEL_PATH)
model_info = joblib.load(INFO_PATH)


# ============================================================
# HOME PAGE
# ============================================================

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/guide")
def guide():
    return render_template("guide.html")

@app.route("/explore")
def explore():
    return render_template("explore.html")


@app.route("/api/careers")
def get_careers():
    try:
        dataset_path = BASE_DIR / "dataset" / "career_explorer_all_domains(2).csv"
        df = pd.read_csv(dataset_path)

        df = df.fillna("")

        return jsonify({
            "status": "success",
            "careers": df.to_dict(orient="records")
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route("/roadmap")
def roadmap():
    career = request.args.get("career", "")

    return render_template(
        "roadmap.html",
        career=career
    )

# ============================================================
# MODEL INFORMATION
# ============================================================

@app.route("/model-info")
def model_information():
    return jsonify(model_info)


# ============================================================
# CAREER PREDICTION
# ============================================================

@app.route("/predict", methods=["POST"])
def predict():

    try:
        data = request.get_json()

        # Convert input into DataFrame
        input_df = pd.DataFrame([data])

        # Make prediction
        prediction = model.predict(input_df)[0]

        return jsonify({
            "status": "success",
            "predicted_career": str(prediction)
        })

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400


# ============================================================
# RUN SERVER
# ============================================================

if __name__ == "__main__":

    print("=" * 50)
    print("CAREER PATH AI")
    print("=" * 50)

    print("Dataset rows:", model_info.get("dataset_rows"))
    print("Number of features:", model_info.get("number_of_features"))
    print("Number of careers:", model_info.get("number_of_careers"))
    print("Training accuracy:", model_info.get("training_accuracy"))
    print("Testing accuracy:", model_info.get("testing_accuracy"))

    print("=" * 50)
    print("Server running at:")
    print("http://127.0.0.1:5000")
    print("=" * 50)

    app.run(debug=True)