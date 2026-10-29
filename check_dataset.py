import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATASET_PATH = BASE_DIR / "ml_model" / "career_pred.csv.csv"

df = pd.read_csv(DATASET_PATH)
df.columns = df.columns.str.strip()

print("=" * 55)
print("CAREER DATASET PATTERN ANALYSIS")
print("=" * 55)

# 1. Check categorical values
categorical_columns = [
    "Class",
    "Interest_Area",
    "Preferred_Work",
    "Work_Style",
    "Education_Goal"
]

for column in categorical_columns:
    print(f"\n{column}:")
    print(df[column].value_counts().head(15))

# 2. Check numeric feature ranges
numeric_columns = [
    "Math_Percentage",
    "Programming_Percentage",
    "Communication_Skills",
    "Logical_Reasoning",
    "Creativity_Score",
    "Coding_Skills_Rating",
    "Public_Speaking_Rating",
    "Problem_Solving_Rating"
]

print("\n\nNUMERIC FEATURE SUMMARY")
print(df[numeric_columns].describe().round(2))

# 3. Compare career labels across interest areas
print("\n\nCAREERS BY INTEREST AREA")
print(pd.crosstab(
    df["Interest_Area"],
    df["Suggested_Job_Role"]
).head(15).to_string())

# 4. Compare career labels across education goals
print("\n\nCAREERS BY EDUCATION GOAL")
print(pd.crosstab(
    df["Education_Goal"],
    df["Suggested_Job_Role"]
).head(15).to_string())

print("\n\nAnalysis completed.")