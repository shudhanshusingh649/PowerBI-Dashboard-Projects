# 📊 HR Workforce & Attrition Analytics

An interactive **HR Workforce & Employee Attrition Analytics Dashboard** built using **Microsoft Power BI**.  
This project analyzes employee demographics, workforce distribution, salary trends, employee attrition, job satisfaction, job involvement, and other factors that may influence employee turnover.

The dashboard is designed to help HR teams understand workforce patterns and identify potential attrition drivers through interactive visualizations and KPIs.

---

## 🎯 Project Objectives

The main objectives of this project are:

- Analyze overall workforce size and employee distribution.
- Measure employee attrition and attrition rate.
- Analyze employee attrition across different departments.
- Identify job roles with higher employee turnover.
- Analyze salary distribution across departments and job roles.
- Understand the impact of overtime on employee attrition.
- Analyze employee demographics such as marital status and education.
- Analyze business travel patterns.
- Study job satisfaction and job involvement among employees who left.
- Analyze the relationship between employee tenure and attrition.
- Provide an interactive dashboard for HR decision-making.

---

## 🛠️ Tools & Technologies

- **Microsoft Power BI**
- **Power Query**
- **DAX**
- **Data Cleaning & Transformation**
- **Data Visualization**
- **CSV Dataset**

---

## 📂 Dataset

The project uses an HR Employee Attrition dataset containing employee information such as:

- Age
- Gender
- Department
- Job Role
- Job Level
- Education
- Education Field
- Marital Status
- Business Travel
- OverTime
- Job Satisfaction
- Job Involvement
- Monthly Income
- Monthly Rate
- Hourly Rate
- Years at Company
- Years Since Last Promotion
- Number of Companies Worked
- Attrition
- and other employee-related attributes.

---

# 📊 Dashboard Structure

The dashboard consists of **three analytical pages**.

---

## 1️⃣ HR Workforce & Attrition Overview

This page provides a high-level overview of the organization's workforce and employee attrition.

### 🔑 Key Performance Indicators

The dashboard contains the following KPIs:

| KPI | Value |
|---|---:|
| Total Employees | 1,470 |
| Employees Left | 237 |
| Attrition Rate | ~16% |
| Average Salary | ~6.50K |
| Average Age | 36.92 |
| Average Experience | 11.28 |

### 📈 Visualizations

The page includes:

- Employees Left by Department
- Employees Left by Overtime
- Employees Left by Job Level
- Average Salary by Department
- Employees by Department

### 🎛️ Interactive Filters

Users can filter the dashboard using:

- Job Role
- Gender
- Department

These filters allow HR users to analyze specific employee groups.

---

## 2️⃣ Workforce & Employee Profile

This page focuses on employee demographics, workforce composition, education, job roles, and salary.

### 📊 Visualizations

#### Employee Demographics

- Total Employees by Marital Status
- Total Employees by Business Travel
- Total Employees by Education Field

#### Workforce Distribution

- Employees by Job Role
- Average Salary by Job Role

### 🔍 Analysis Areas

This page helps understand:

- Employee marital status distribution.
- Employee business travel patterns.
- Educational background of employees.
- Workforce distribution across different job roles.
- Salary differences between job roles.

---

## 3️⃣ Attrition Drivers & Risk Analysis

This page focuses specifically on factors associated with employee attrition.

### 📊 Visualizations

- Employees Left by Job Involvement
- Employees Left by Years Since Last Promotion
- Employees Left by Job Satisfaction
- Employees Left by Years at Company
- Employees Left by Job Role

### 🔍 Analysis Areas

This page helps identify possible attrition patterns related to:

- Job involvement
- Job satisfaction
- Career progression
- Employee tenure
- Job roles

The objective is to help HR teams identify areas where employee retention strategies may be required.

---

# 📌 Key Insights

Based on the dashboard analysis:

### 👥 Workforce

The dataset contains **1,470 employees**, with **237 employees having left the organization**.

### 📉 Attrition

The overall attrition rate is approximately **16%**, indicating that employee turnover is an important HR metric to monitor.

### 🏢 Department Analysis

The dashboard shows that attrition is not evenly distributed across departments.  
**Research & Development** accounts for the largest number of employees and also has the highest number of employees who left among the displayed departments.

### ⏰ Overtime

The overtime analysis shows a noticeable difference in attrition between employees working overtime and those who do not.

This can help HR investigate whether workload and overtime are contributing to employee turnover.

### 💼 Job Roles

Different job roles have significantly different workforce sizes and attrition levels.

The dashboard allows HR teams to identify job roles with comparatively higher numbers of employees leaving.

### 💰 Salary

Average salary varies considerably across departments and job roles.

The dashboard can be used to compare compensation patterns and identify roles with higher or lower average salaries.

### 😊 Job Satisfaction

Employees who left are distributed across different job satisfaction levels.  
This can help HR investigate whether employee satisfaction is associated with attrition.

### 📈 Career Progression

The analysis of **Years Since Last Promotion** provides insight into whether limited career progression may be associated with employee turnover.

### 🏢 Employee Tenure

The **Years at Company** analysis helps identify employee tenure patterns among employees who left the organization.

---

# 🎨 Dashboard Features

The Power BI dashboard provides:

- Interactive charts
- KPI cards
- Department filtering
- Job role filtering
- Gender filtering
- Cross-filtering between visuals
- Employee attrition analysis
- Workforce analysis
- Salary analysis
- Demographic analysis
- Job satisfaction analysis
- Career progression analysis

---

# 📷 Dashboard Preview

## Page 1 – HR Workforce & Attrition Overview

![HR Workforce & Attrition Overview](images%20(1).jpeg)

This page provides an overall view of workforce size, attrition, salary, employee demographics, and department-level analysis.

---

## Page 2 – Workforce & Employee Profile

This page provides detailed analysis of employee demographics, education, business travel, job roles, and salary.

---

## Page 3 – Attrition Drivers & Risk Analysis

This page focuses on employee attrition drivers including job involvement, job satisfaction, years since promotion, years at company, and job role.

---

# 📁 Project Structure

```text
HR Workforce & Attrition Analytics/
│
├── HrDashboard.pbix
│
├── WA_Fn-UseC_-HR-Employee-Attrition-Dashboard.csv
│
├── images (1).jpeg
│
└── README.md