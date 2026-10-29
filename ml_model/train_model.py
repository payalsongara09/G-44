
from pathlib import Path

import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report


# =========================================================
# 1. PROJECT PATHS
# =========================================================

BASE_DIR = Path(__file__).resolve().parent.parent

ML_MODEL_DIR = BASE_DIR / "ml_model"
MODEL_DIR = BASE_DIR / "models"

MODEL_DIR.mkdir(parents=True, exist_ok=True)


# =========================================================
# 2. DATASET CONFIGURATION
# =========================================================

DATASET_PATH = ML_MODEL_DIR / "carrer_advisor_dataset_diverse.csv"

TARGET_COLUMN = "Suggested_Job_Role"

MODEL_PATH = MODEL_DIR / "career_model.pkl"
MODEL_INFO_PATH = MODEL_DIR / "model_info.pkl"


print("\n" + "=" * 60)
print("          CAREERPATH AI - MODEL TRAINING")
print("=" * 60)


if not DATASET_PATH.exists():
    raise FileNotFoundError(
        f"\nDataset not found:\n{DATASET_PATH}\n"
        "Please check the filename and location."
    )

print("\nDataset found:", DATASET_PATH.name)


# =========================================================
# 3. LOAD COMPLETE DATASET
# =========================================================

print("\nLoading complete dataset...")

df = pd.read_csv(DATASET_PATH)
# Remove accidental spaces from column names.
df.columns = df.columns.astype(str).str.strip()

print("\nDataset loaded successfully!")
print("Total rows:", len(df))
print("Total columns:", len(df.columns))


# =========================================================
# 4. VALIDATE DATASET
# =========================================================

if df.empty:
    raise ValueError("The dataset is empty.")

if df.columns.duplicated().any():
    duplicate_columns = df.columns[df.columns.duplicated()].tolist()

    raise ValueError(
        f"Duplicate column names found: {duplicate_columns}"
    )

if TARGET_COLUMN not in df.columns:
    raise ValueError(
        f"Target column '{TARGET_COLUMN}' was not found.\n"
        f"Available columns: {df.columns.tolist()}"
    )

print("\nDataset columns:")
for number, column in enumerate(df.columns, start=1):
    print(f"{number}. {column}")


# =========================================================
# 5. CLEAN TARGET COLUMN
# =========================================================

# Remove rows without a valid career label.
df[TARGET_COLUMN] = df[TARGET_COLUMN].astype("string").str.strip()

df[TARGET_COLUMN] = df[TARGET_COLUMN].replace("", pd.NA)

df = df.dropna(subset=[TARGET_COLUMN]).copy()

# Remove accidental leading/trailing spaces from text features.
for column in df.select_dtypes(include=["object", "string"]).columns:
    df[column] = df[column].apply(
        lambda value: value.strip()
        if isinstance(value, str)
        else value
    )

print("\nRows after removing missing career labels:", len(df))

if df.empty:
    raise ValueError("No valid career labels remain in the dataset.")


# =========================================================
# 6. SEPARATE FEATURES AND TARGET
# =========================================================

X = df.drop(columns=[TARGET_COLUMN]).copy()

y = df[TARGET_COLUMN].astype(str)

# Exclude rows with no usable input information.
valid_feature_rows = X.notna().any(axis=1)

X = X.loc[valid_feature_rows].copy()
y = y.loc[valid_feature_rows].copy()

if X.empty:
    raise ValueError("No usable input records remain.")

if y.nunique() < 2:
    raise ValueError(
        "At least two distinct career labels are required for training."
    )

print("\nInput features:", X.shape[1])
print("Career classes:", y.nunique())
print("Usable records:", len(X))


# =========================================================
# 7. CHECK CAREER DISTRIBUTION
# =========================================================

career_counts = y.value_counts()

print("\nCareer distribution:")
print(career_counts.to_string())

# Stratified splitting requires at least two examples per class.
rare_careers = career_counts[career_counts < 2]

if not rare_careers.empty:
    raise ValueError(
        "\nSome careers have fewer than two records. "
        "Add more examples for these careers before training.\n"
        f"{rare_careers.to_string()}"
    )


# =========================================================
# 8. IDENTIFY NUMERIC AND CATEGORICAL FEATURES
# =========================================================

numeric_features = X.select_dtypes(
    include=["number"]
).columns.tolist()

categorical_features = X.select_dtypes(
    exclude=["number"]
).columns.tolist()

print("\nNumeric features:", numeric_features)
print("\nCategorical features:", categorical_features)


# =========================================================
# 9. NUMERIC PREPROCESSING
# =========================================================

numeric_pipeline = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(strategy="median")
        )
    ]
)


# =========================================================
# 10. CATEGORICAL PREPROCESSING
# =========================================================

categorical_pipeline = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(strategy="most_frequent")
        ),
        (
            "encoder",
            OneHotEncoder(handle_unknown="ignore")
        )
    ]
)


# =========================================================
# 11. COMBINE PREPROCESSING
# =========================================================

transformers = []

if numeric_features:
    transformers.append(
        (
            "numeric",
            numeric_pipeline,
            numeric_features
        )
    )

if categorical_features:
    transformers.append(
        (
            "categorical",
            categorical_pipeline,
            categorical_features
        )
    )

preprocessor = ColumnTransformer(
    transformers=transformers,
    remainder="drop"
)


# =========================================================
# 12. TRAIN-TEST SPLIT
# =========================================================

print("\nSplitting dataset into training and testing sets...")

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("Training records:", len(X_train))
print("Testing records:", len(X_test))


# =========================================================
# 13. RANDOM FOREST CLASSIFIER
# =========================================================

model = RandomForestClassifier(
    n_estimators=300,
    random_state=42,
    n_jobs=-1,
    class_weight="balanced"
)


# =========================================================
# 14. COMPLETE MACHINE LEARNING PIPELINE
# =========================================================

pipeline = Pipeline(
    steps=[
        (
            "preprocessor",
            preprocessor
        ),
        (
            "model",
            model
        )
    ]
)


# =========================================================
# 15. TRAIN MODEL
# =========================================================

print("\n" + "=" * 60)
print("Training Random Forest Classifier...")
print("=" * 60)

pipeline.fit(X_train, y_train)

print("\nTraining completed successfully!")


# =========================================================
# 16. GENERATE PREDICTIONS
# =========================================================

y_train_pred = pipeline.predict(X_train)
y_test_pred = pipeline.predict(X_test)


# =========================================================
# 17. EVALUATE MODEL
# =========================================================

training_accuracy = accuracy_score(
    y_train,
    y_train_pred
)

testing_accuracy = accuracy_score(
    y_test,
    y_test_pred
)

print("\n" + "=" * 60)
print("                 MODEL RESULTS")
print("=" * 60)

print(f"\nTraining Accuracy: {training_accuracy * 100:.2f}%")
print(f"Testing Accuracy : {testing_accuracy * 100:.2f}%")

print(
    "\nNote: Testing accuracy is measured on records "
    "excluded from model training."
)


# =========================================================
# 18. CLASSIFICATION REPORT
# =========================================================

print("\n" + "=" * 60)
print("              CLASSIFICATION REPORT")
print("=" * 60)

print(
    classification_report(
        y_test,
        y_test_pred,
        zero_division=0
    )
)


# =========================================================
# 19. SAVE TRAINED MODEL
# =========================================================

joblib.dump(
    pipeline,
    MODEL_PATH
)

print("\nTrained model saved:")
print(MODEL_PATH)


# =========================================================
# 20. SAVE MODEL INFORMATION
# =========================================================

model_info = {
    "dataset": DATASET_PATH.name,
    "dataset_rows": int(len(df)),
    "dataset_columns": int(len(df.columns)),
    "training_records": int(len(X_train)),
    "testing_records": int(len(X_test)),
    "number_of_features": int(X.shape[1]),
    "number_of_careers": int(y.nunique()),
    "target_column": TARGET_COLUMN,
    "training_accuracy": float(training_accuracy),
    "testing_accuracy": float(testing_accuracy),
    "model": "Random Forest Classifier",
    "features": X.columns.tolist(),
    "numeric_features": numeric_features,
    "categorical_features": categorical_features,
    "career_classes": sorted(y.unique().tolist()),
    "test_size": 0.20,
    "random_state": 42,
    "n_estimators": 300
}

joblib.dump(
    model_info,
    MODEL_INFO_PATH
)

print("\nModel information saved:")
print(MODEL_INFO_PATH)


# =========================================================
# 21. TRAINING COMPLETED
# =========================================================

print("\n" + "=" * 60)
print("       CAREERPATH AI TRAINING COMPLETED")
print("=" * 60)

print("\nModel files:")
print("1.", MODEL_PATH)
print("2.", MODEL_INFO_PATH)

print("\nFinal summary:")
print("Dataset:", DATASET_PATH.name)
print("Records used:", len(X))
print("Features:", X.shape[1])
print("Career classes:", y.nunique())
print(f"Testing accuracy: {testing_accuracy * 100:.2f}%")

print("\nYour Random Forest model is ready for integration.")
