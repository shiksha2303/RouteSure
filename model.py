import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# -------------------------------
# STEP 1: Load Dataset (FULL PATH)
# -------------------------------
# Load dataset
data = pd.read_csv("C:/Users/shiks/OneDrive/Desktop/RouteSure/ML/smart_mobility_dataset.csv")

# 🔥 CLEAN COLUMN NAMES
data.columns = data.columns.str.strip().str.lower()

print("Columns after cleaning:", data.columns)

# -------------------------------
# STEP 2: Select Required Columns
# -------------------------------
features = ['vehicle_count', 'traffic_speed_kmh', 'road_occupancy_%']
target = 'traffic_condition'

data = data[features + [target]]

print("Filtered Data:")
print(data.head())

# -------------------------------
# STEP 3: Clean Data
# -------------------------------
data = data.dropna()

# -------------------------------
# STEP 4: Features & Target
# -------------------------------
X = data[features]
y = data[target]

# -------------------------------
# STEP 5: Train-Test Split
# -------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# -------------------------------
# STEP 6: Train Model
# -------------------------------
model = RandomForestClassifier()
model.fit(X_train, y_train)

print("Model Trained Successfully")

# -------------------------------
# STEP 7: Predictions
# -------------------------------
predictions = model.predict(X_test)

# -------------------------------
# STEP 8: Accuracy
# -------------------------------
accuracy = model.score(X_test, y_test)

# -------------------------------
# FINAL OUTPUT (IMPORTANT)
# -------------------------------
print("Predictions:", list(predictions[:5]))
print("Accuracy:", accuracy)