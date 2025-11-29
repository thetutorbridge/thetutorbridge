'use client';

import Link from 'next/link';
import { Calculator, Home, ArrowRight, GraduationCap, Percent, DollarSign, Ruler, Clock, Hash, TrendingUp, BookOpen, ChevronDown } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { useState } from 'react';

const calculators = {
  'Academic & Education': [
    {
      name: 'College GPA Calculator',
      href: '/calculators/college-gpa-calculator',
      description: 'Calculate your cumulative college GPA with credit weighting across multiple semesters on 4.0 scale.',
      gradient: 'from-blue-600 to-cyan-600',
      tags: ['4.0 Scale', 'Credit-Weighted', 'Cumulative GPA']
    },
    {
      name: 'High School GPA Calculator',
      href: '/calculators/high-school-gpa-calculator',
      description: 'Calculate weighted and unweighted GPA with AP, IB, and Honors classes. Track class rank and college readiness.',
      gradient: 'from-purple-600 to-pink-600',
      tags: ['Weighted GPA', 'AP/IB Bonus', 'Class Rank']
    },
    {
      name: 'Middle School GPA Calculator',
      href: '/calculators/middle-school-gpa-calculator',
      description: 'Calculate your junior high GPA for 6th, 7th, and 8th grade on 4.0 scale. Prepare for high school.',
      gradient: 'from-cyan-600 via-blue-600 to-indigo-600',
      tags: ['4.0 Scale', 'Junior High', '6th-8th Grade']
    },
    {
      name: 'Grade Calculator',
      href: '/calculators/grade-calculator',
      description: 'Calculate your final course grade and find what score you need on finals to achieve your desired grade.',
      gradient: 'from-indigo-600 via-purple-600 to-pink-600',
      tags: ['Weighted Grades', 'Final Exam', 'Course Grade']
    },
    {
      name: 'Semester Grade Calculator',
      href: '/calculators/semester-grade-calculator',
      description: 'Calculate semester grades using quarterly grades and final exam scores with customizable weights.',
      gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
      tags: ['Weighted Average', 'Quarters', 'Semester GPA']
    },
    {
      name: 'EZ Grader',
      href: '/calculators/ez-grader',
      description: 'Quick grade calculator for teachers. Convert test scores to letter grades instantly with printable charts.',
      gradient: 'from-green-600 via-emerald-600 to-teal-600',
      tags: ['Grading Chart', 'Printable', 'Teacher Tool']
    },
    {
      name: 'CGPA to Percentage Calculator',
      href: '/calculators/cgpa-to-percentage-calculator',
      description: 'Convert CGPA to percentage for Indian universities and colleges with multiple conversion formulas.',
      gradient: 'from-orange-600 to-red-600',
      tags: ['CGPA', 'Percentage', 'India']
    },
    {
      name: 'Percentage to CGPA Calculator',
      href: '/calculators/percentage-to-cgpa-calculator',
      description: 'Convert percentage marks to CGPA for Indian students with accurate conversion methods.',
      gradient: 'from-red-600 to-pink-600',
      tags: ['Percentage', 'CGPA', 'Conversion']
    },
    {
      name: 'SGPA to CGPA Calculator',
      href: '/calculators/sgpa-to-cgpa-calculator',
      description: 'Convert semester GPA to cumulative GPA with credit-based weighted calculation.',
      gradient: 'from-teal-600 to-cyan-600',
      tags: ['SGPA', 'CGPA', 'Semester']
    },
    {
      name: 'SGPA to Percentage Calculator',
      href: '/calculators/sgpa-to-percentage-calculator',
      description: 'Convert SGPA to percentage marks using standard university conversion formulas.',
      gradient: 'from-cyan-600 to-blue-600',
      tags: ['SGPA', 'Percentage', 'University']
    },
    {
      name: 'Marks Percentage Calculator',
      href: '/calculators/marks-percentage-calculator',
      description: 'Calculate percentage from marks obtained out of total marks for exams and tests.',
      gradient: 'from-green-600 to-emerald-600',
      tags: ['Marks', 'Percentage', 'Exams']
    },
  ],
  'Financial & Investment': [
    {
      name: 'SIP Calculator',
      href: '/calculators/sip-calculator',
      description: 'Calculate SIP returns, maturity amount, and wealth gained through systematic investment plans.',
      gradient: 'from-green-600 to-emerald-600',
      tags: ['SIP', 'Mutual Funds', 'Investment']
    },
    {
      name: 'Annual Income Calculator',
      href: '/calculators/annual-income-calculator',
      description: 'Convert hourly wage to annual salary or calculate hourly rate from yearly income. Includes tax deductions for net pay.',
      gradient: 'from-emerald-600 to-teal-600',
      tags: ['Salary', 'Hourly to Annual', 'Net Income']
    },
    {
      name: 'EMI Calculator',
      href: '/calculators/emi-calculator',
      description: 'Calculate monthly EMI for loans with detailed amortization schedule and principal-interest breakdown.',
      gradient: 'from-blue-600 to-indigo-600',
      tags: ['EMI', 'Loans', 'Amortization']
    },
    {
      name: 'Amortization Calculator',
      href: '/calculators/amortization-calculator',
      description: 'Create detailed loan amortization schedules with monthly/yearly views and extra payment options.',
      gradient: 'from-indigo-700 to-purple-700',
      tags: ['Amortization', 'Loan Schedule', 'Extra Payments']
    },
    {
      name: 'Home Loan EMI Calculator',
      href: '/calculators/home-loan-emi-calculator',
      description: 'Calculate home loan EMI with prepayment options, tax benefits, and total interest payable.',
      gradient: 'from-indigo-600 to-purple-600',
      tags: ['Home Loan', 'EMI', 'Tax Benefits']
    },
    {
      name: 'Mortgage Calculator',
      href: '/calculators/mortgage-calculator',
      description: 'Calculate monthly mortgage payments with taxes, insurance, PMI, and HOA fees. Get detailed amortization schedule.',
      gradient: 'from-blue-700 to-indigo-700',
      tags: ['Mortgage', 'Home Loan', 'Amortization']
    },
    {
      name: 'Car Loan EMI Calculator',
      href: '/calculators/car-loan-emi-calculator',
      description: 'Calculate car loan EMI with down payment, interest rate, and loan tenure options.',
      gradient: 'from-purple-600 to-pink-600',
      tags: ['Car Loan', 'EMI', 'Auto Finance']
    },
    {
      name: 'Car Payment Calculator',
      href: '/calculators/car-payment-calculator',
      description: 'Calculate auto loan monthly payments with trade-in, down payment, sales tax, and amortization schedule.',
      gradient: 'from-blue-600 to-indigo-600',
      tags: ['Auto Loan', 'Car Finance', 'Monthly Payment']
    },
    {
      name: 'Personal Loan EMI Calculator',
      href: '/calculators/personal-loan-emi-calculator',
      description: 'Calculate personal loan EMI with flexible tenure and interest rate options.',
      gradient: 'from-pink-600 to-red-600',
      tags: ['Personal Loan', 'EMI', 'Finance']
    },
    {
      name: 'Compound Interest Calculator',
      href: '/calculators/compound-interest-calculator',
      description: 'Calculate compound interest with different compounding frequencies and time periods.',
      gradient: 'from-orange-600 to-amber-600',
      tags: ['Compound Interest', 'Investment', 'Growth']
    },
    {
      name: 'Simple Interest Calculator',
      href: '/calculators/simple-interest-calculator',
      description: 'Calculate simple interest on principal amount with customizable rate and time period.',
      gradient: 'from-yellow-600 to-orange-600',
      tags: ['Simple Interest', 'Principal', 'Interest Rate']
    },
    {
      name: 'FD Calculator',
      href: '/calculators/fd-calculator',
      description: 'Calculate fixed deposit maturity amount and interest earned on FD investments.',
      gradient: 'from-teal-600 to-green-600',
      tags: ['Fixed Deposit', 'FD', 'Maturity']
    },
    {
      name: 'PPF Calculator',
      href: '/calculators/ppf-calculator',
      description: 'Calculate Public Provident Fund maturity amount, interest, and year-wise balance.',
      gradient: 'from-cyan-600 to-teal-600',
      tags: ['PPF', 'Retirement', 'Tax-Free']
    },
    {
      name: 'Lumpsum Calculator',
      href: '/calculators/lumpsum-calculator',
      description: 'Calculate returns on lumpsum investment in mutual funds and other instruments.',
      gradient: 'from-blue-600 to-cyan-600',
      tags: ['Lumpsum', 'Mutual Funds', 'Returns']
    },
    {
      name: 'SWP Calculator',
      href: '/calculators/swp-calculator',
      description: 'Calculate systematic withdrawal plan returns and final corpus after regular withdrawals.',
      gradient: 'from-indigo-600 to-blue-600',
      tags: ['SWP', 'Withdrawal', 'Retirement']
    },
    {
      name: 'Step Up SIP Calculator',
      href: '/calculators/step-up-sip-calculator',
      description: 'Calculate SIP returns with annual step-up or increment in monthly investment amount.',
      gradient: 'from-purple-600 to-indigo-600',
      tags: ['Step-Up SIP', 'Increment', 'Wealth']
    },
    {
      name: 'SBI SIP Calculator',
      href: '/calculators/sbi-sip-calculator',
      description: 'Calculate SBI mutual fund SIP returns with historical performance data.',
      gradient: 'from-green-600 to-teal-600',
      tags: ['SBI', 'SIP', 'Mutual Funds']
    },
    {
      name: 'Income Tax Calculator',
      href: '/calculators/income-tax-calculator',
      description: 'Calculate income tax liability under old and new tax regime with deductions.',
      gradient: 'from-red-600 to-orange-600',
      tags: ['Income Tax', 'Tax Liability', 'Deductions']
    },
    {
      name: 'Salary Calculator',
      href: '/calculators/salary-calculator',
      description: 'Calculate in-hand salary from CTC with tax deductions and allowances breakdown.',
      gradient: 'from-orange-600 to-yellow-600',
      tags: ['Salary', 'CTC', 'In-Hand']
    },
    {
      name: 'Salary to Hourly Calculator',
      href: '/calculators/salary-to-hourly-calculator',
      description: 'Convert annual, monthly, or weekly salary to hourly rate. Calculate wage across all time intervals.',
      gradient: 'from-yellow-600 to-amber-600',
      tags: ['Hourly Rate', 'Wage Converter', 'Salary']
    },
    {
      name: 'Gratuity Calculator',
      href: '/calculators/gratuity-calculator',
      description: 'Calculate gratuity amount based on last drawn salary and years of service.',
      gradient: 'from-amber-600 to-orange-600',
      tags: ['Gratuity', 'Retirement', 'Service']
    },
    {
      name: 'Stock Average Calculator',
      href: '/calculators/stock-average-calculator',
      description: 'Calculate average stock purchase price after multiple buy transactions.',
      gradient: 'from-emerald-600 to-green-600',
      tags: ['Stocks', 'Average Price', 'Trading']
    },
    {
      name: 'Pay Raise Calculator',
      href: '/calculators/pay-raise-calculator',
      description: 'Calculate your new salary after a raise. See hourly, weekly, monthly, and annual pay breakdowns with raise percentage.',
      gradient: 'from-teal-600 to-green-600',
      tags: ['Salary', 'Raise', 'Income']
    },
    {
      name: 'Sukanya Samriddhi Yojana Calculator',
      href: '/calculators/sukanya-samriddhi-yojana-calculator',
      description: 'Calculate SSY maturity amount for girl child savings scheme with government interest.',
      gradient: 'from-pink-600 to-purple-600',
      tags: ['SSY', 'Girl Child', 'Savings']
    },
  ],
  'Percentage & Math': [
    {
      name: 'Percentage Calculator',
      href: '/calculators/percentage-calculator',
      description: 'Calculate percentages, percentage of a number, and solve percentage problems easily.',
      gradient: 'from-blue-600 to-cyan-600',
      tags: ['Percentage', 'Calculate', 'Basic Math']
    },
    {
      name: 'Percentage Change Calculator',
      href: '/calculators/percentage-change-calculator',
      description: 'Calculate percentage increase or decrease between two values with formula.',
      gradient: 'from-green-600 to-emerald-600',
      tags: ['Change', 'Increase', 'Decrease']
    },
    {
      name: 'Percentage Difference Calculator',
      href: '/calculators/percentage-difference-calculator',
      description: 'Calculate percentage difference between two numbers with step-by-step solution.',
      gradient: 'from-purple-600 to-pink-600',
      tags: ['Difference', 'Compare', 'Values']
    },
    {
      name: 'Percentage Increase Calculator',
      href: '/calculators/percentage-increase-calculator',
      description: 'Calculate percentage increase from original to new value with detailed breakdown.',
      gradient: 'from-orange-600 to-red-600',
      tags: ['Increase', 'Growth', 'Percentage']
    },
    {
      name: 'Percent Error Calculator',
      href: '/calculators/percent-error-calculator',
      description: 'Calculate percent error between experimental and theoretical values for science.',
      gradient: 'from-red-600 to-pink-600',
      tags: ['Error', 'Experimental', 'Science']
    },
    {
      name: 'Percentile Calculator',
      href: '/calculators/percentile-calculator',
      description: 'Calculate percentile rank and find percentile value from dataset.',
      gradient: 'from-indigo-600 to-purple-600',
      tags: ['Percentile', 'Rank', 'Statistics']
    },
    {
      name: 'Quadratic Formula Calculator',
      href: '/calculators/quadratic-formula-calculator',
      description: 'Solve quadratic equations using the quadratic formula with step-by-step solutions.',
      gradient: 'from-cyan-600 to-blue-600',
      tags: ['Quadratic', 'Algebra', 'Roots']
    },
    {
      name: 'Slope Calculator',
      href: '/calculators/slope-calculator',
      description: 'Calculate slope, distance, and midpoint between two points with graph visualization.',
      gradient: 'from-teal-600 to-cyan-600',
      tags: ['Slope', 'Geometry', 'Points']
    },
    {
      name: 'Factoring Calculator',
      href: '/calculators/factoring-calculator',
      description: 'Factor polynomials, quadratics, and algebraic expressions with detailed steps.',
      gradient: 'from-green-600 to-teal-600',
      tags: ['Factoring', 'Polynomials', 'Algebra']
    },
    {
      name: 'GCF Calculator',
      href: '/calculators/gcf-calculator',
      description: 'Find greatest common factor (GCF) of numbers using prime factorization method.',
      gradient: 'from-blue-600 to-indigo-600',
      tags: ['GCF', 'Common Factor', 'Prime']
    },
    {
      name: 'LCM Calculator',
      href: '/calculators/lcm-calculator',
      description: 'Find least common multiple (LCM) of numbers with step-by-step calculation.',
      gradient: 'from-purple-600 to-indigo-600',
      tags: ['LCM', 'Common Multiple', 'Math']
    },
    {
      name: 'Long Division Calculator',
      href: '/calculators/long-division-calculator',
      description: 'Perform long division with remainder and quotient calculation with steps.',
      gradient: 'from-pink-600 to-purple-600',
      tags: ['Division', 'Remainder', 'Quotient']
    },
    {
      name: 'Cube Root Calculator',
      href: '/calculators/cube-root-calculator',
      description: 'Calculate cube root of any number with perfect cube identification.',
      gradient: 'from-orange-600 to-amber-600',
      tags: ['Cube Root', 'Math', 'Roots']
    },
    {
      name: 'Combinations Calculator',
      href: '/calculators/combinations-calculator',
      description: 'Calculate combinations and permutations with factorial-based formula.',
      gradient: 'from-amber-600 to-yellow-600',
      tags: ['Combinations', 'Permutations', 'Probability']
    },
    {
      name: 'Modulo Calculator',
      href: '/calculators/modulo-calculator',
      description: 'Calculate modulo (remainder) operation with detailed explanation.',
      gradient: 'from-cyan-600 to-teal-600',
      tags: ['Modulo', 'Remainder', 'Division']
    },
    {
      name: 'Ratio Calculator',
      href: '/calculators/ratio-calculator',
      description: 'Simplify ratios and solve ratio problems with proportions.',
      gradient: 'from-emerald-600 to-green-600',
      tags: ['Ratio', 'Proportion', 'Simplify']
    },
    {
      name: 'Circumference Calculator',
      href: '/calculators/circumference-calculator',
      description: 'Calculate circle circumference, radius, diameter, and area using C = 2πr formula. Enter any value to find all properties.',
      gradient: 'from-indigo-600 to-violet-600',
      tags: ['Circle', 'Geometry', 'C = 2πr']
    },
    {
      name: 'Area of a Circle Calculator',
      href: '/calculators/area-of-a-circle-calculator',
      description: 'Calculate circle area from radius or diameter using A = πr² formula. Find radius from area with step-by-step solutions.',
      gradient: 'from-purple-600 to-fuchsia-600',
      tags: ['Circle Area', 'A = πr²', 'Geometry']
    },
    {
      name: 'Cylinder Volume Calculator',
      href: '/calculators/cylinder-volume-calculator',
      description: 'Calculate volume, surface area, and lateral area of solid or hollow cylinders. Uses V = πr²h formula with unit conversion.',
      gradient: 'from-blue-600 to-cyan-600',
      tags: ['Cylinder', 'Volume', 'V = πr²h']
    },
    {
      name: 'Trigonometry Calculator',
      href: '/calculators/trigonometry-calculator',
      description: 'Calculate sin, cos, tan and solve right triangles. Find missing sides and angles using SOHCAHTOA.',
      gradient: 'from-indigo-600 to-purple-600',
      tags: ['Sin Cos Tan', 'Triangle', 'SOHCAHTOA']
    },
  ],
  'Statistics & Data': [
    {
      name: 'Average Calculator',
      href: '/calculators/average-calculator',
      description: 'Calculate average (mean), median, mode, range, variance, and standard deviation of any numbers instantly.',
      gradient: 'from-teal-600 to-blue-600',
      tags: ['Average', 'Mean', 'Statistics']
    },
    {
      name: 'Mean Mode Median Calculator',
      href: '/calculators/mean-mode-median-calculator',
      description: 'Calculate mean, median, mode, and range of dataset with frequency distribution.',
      gradient: 'from-blue-600 to-cyan-600',
      tags: ['Mean', 'Median', 'Mode']
    },
    {
      name: 'Standard Deviation Calculator',
      href: '/calculators/standard-deviation-calculator',
      description: 'Calculate standard deviation, variance, and mean of dataset with population/sample option.',
      gradient: 'from-purple-600 to-indigo-600',
      tags: ['Standard Deviation', 'Variance', 'Statistics']
    },
    {
      name: 'Variance Calculator',
      href: '/calculators/variance-calculator',
      description: 'Calculate variance of dataset with sample and population variance options.',
      gradient: 'from-indigo-600 to-purple-600',
      tags: ['Variance', 'Statistics', 'Data']
    },
    {
      name: 'Quartile Calculator',
      href: '/calculators/quartile-calculator',
      description: 'Calculate quartiles (Q1, Q2, Q3), IQR, and identify outliers in dataset.',
      gradient: 'from-teal-600 to-cyan-600',
      tags: ['Quartiles', 'IQR', 'Outliers']
    },
    {
      name: 'Random Number Generator',
      href: '/calculators/random-number-generator',
      description: 'Generate random numbers within specified range with customizable settings.',
      gradient: 'from-green-600 to-emerald-600',
      tags: ['Random', 'Generator', 'Numbers']
    },
    {
      name: 'Dice Roller',
      href: '/calculators/dice-roller',
      description: 'Roll virtual dice online for D&D, RPGs, and board games. Supports d4, d6, d8, d10, d12, d20, d100, and custom dice.',
      gradient: 'from-purple-600 to-pink-600',
      tags: ['Dice', 'D&D', 'RPG']
    },
    {
      name: 'Love Calculator',
      href: '/calculators/love-calculator',
      description: 'Fun love compatibility calculator to test romantic match percentage between two names. Entertainment only!',
      gradient: 'from-pink-600 to-rose-600',
      tags: ['Love', 'Compatibility', 'Fun']
    },
  ],
  'Fractions & Decimals': [
    {
      name: 'Fractions Calculator',
      href: '/calculators/fractions-calculator',
      description: 'Add, subtract, multiply, and divide fractions with step-by-step solutions.',
      gradient: 'from-blue-600 to-indigo-600',
      tags: ['Fractions', 'Operations', 'Math']
    },
    {
      name: 'Mixed Numbers Calculator',
      href: '/calculators/mixed-numbers-calculator',
      description: 'Calculate with mixed numbers and improper fractions with automatic conversion.',
      gradient: 'from-purple-600 to-pink-600',
      tags: ['Mixed Numbers', 'Fractions', 'Convert']
    },
    {
      name: 'Simplifying Fractions Calculator',
      href: '/calculators/simplifying-fractions-calculator',
      description: 'Simplify fractions to lowest terms with GCF method and steps.',
      gradient: 'from-green-600 to-teal-600',
      tags: ['Simplify', 'Reduce', 'Fractions']
    },
    {
      name: 'Decimal to Fraction Calculator',
      href: '/calculators/decimal-to-fraction-calculator',
      description: 'Convert decimals to fractions in simplified form with step-by-step process.',
      gradient: 'from-cyan-600 to-blue-600',
      tags: ['Decimal', 'Fraction', 'Convert']
    },
    {
      name: 'Fraction to Decimal Calculator',
      href: '/calculators/fraction-to-decimal-calculator',
      description: 'Convert fractions to decimals with repeating decimal notation.',
      gradient: 'from-orange-600 to-red-600',
      tags: ['Fraction', 'Decimal', 'Convert']
    },
    {
      name: 'Fraction to Percent Calculator',
      href: '/calculators/fraction-to-percent-calculator',
      description: 'Convert fractions to percentages with detailed calculation steps.',
      gradient: 'from-pink-600 to-purple-600',
      tags: ['Fraction', 'Percent', 'Convert']
    },
  ],
  'Business & Commerce': [
    {
      name: 'Profit Margin Calculator',
      href: '/calculators/profit-margin-calculator',
      description: 'Calculate profit margin, markup, and profit percentage for business pricing.',
      gradient: 'from-green-600 to-emerald-600',
      tags: ['Profit', 'Margin', 'Business']
    },
    {
      name: 'Margin Calculator',
      href: '/calculators/margin-calculator',
      description: 'Calculate gross margin, net margin, and operating margin with formulas.',
      gradient: 'from-emerald-600 to-teal-600',
      tags: ['Margin', 'Gross', 'Net']
    },
    {
      name: 'Money Calculator',
      href: '/calculators/money-calculator',
      description: 'Count money with bills and coins, calculate total cash value.',
      gradient: 'from-blue-600 to-cyan-600',
      tags: ['Money', 'Cash', 'Count']
    },
  ],
  'Measurement & Conversion': [
    {
      name: 'BMI Calculator',
      href: '/calculators/bmi-calculator',
      description: 'Calculate Body Mass Index (BMI) with metric or imperial units. Get BMI category, healthy weight range, and health insights.',
      gradient: 'from-green-600 to-emerald-600',
      tags: ['BMI', 'Body Mass Index', 'Health']
    },
    {
      name: 'BMR Calculator',
      href: '/calculators/bmr-calculator',
      description: 'Calculate Basal Metabolic Rate (BMR) and TDEE using 3 scientific formulas. Get daily calorie needs for all activity levels.',
      gradient: 'from-orange-600 to-red-600',
      tags: ['BMR', 'Metabolism', 'TDEE']
    },
    {
      name: 'Calorie Calculator',
      href: '/calculators/calorie-calculator',
      description: 'Calculate daily calorie needs for weight loss, maintenance, or muscle gain. Get BMR, TDEE, and personalized calorie targets.',
      gradient: 'from-orange-600 to-red-600',
      tags: ['BMR', 'TDEE', 'Weight Loss']
    },
    {
      name: 'Maintenance Calorie Calculator',
      href: '/calculators/maintenance-calorie-calculator',
      description: 'Find how many calories you need to maintain your current weight. Calculate TDEE with BMR using Mifflin-St Jeor formula.',
      gradient: 'from-green-600 to-emerald-600',
      tags: ['TDEE', 'Maintenance', 'Daily Calories']
    },
    {
      name: 'Body Shape Calculator',
      href: '/calculators/body-shape-calculator',
      description: 'Find your body shape (hourglass, pear, apple, rectangle) from bust, waist, and hip measurements. Get personalized fashion tips.',
      gradient: 'from-pink-600 to-purple-600',
      tags: ['Body Type', 'Fashion Tips', 'Measurements']
    },
    {
      name: 'Face Shape Calculator',
      href: '/calculators/face-shape-calculator',
      description: 'Discover your face shape (oval, round, square, heart, diamond) from facial measurements. Get hairstyle and glasses recommendations.',
      gradient: 'from-purple-600 to-indigo-600',
      tags: ['Face Shape', 'Hairstyle Tips', 'Glasses']
    },
    {
      name: 'Square Footage Calculator',
      href: '/calculators/square-footage-calculator',
      description: 'Calculate area in sq ft, sq m, and acres for any shape with cost estimation.',
      gradient: 'from-blue-600 to-cyan-600',
      tags: ['Multiple Shapes', 'Cost Estimator', 'Unit Converter']
    },
    {
      name: 'Cubic Yards Calculator',
      href: '/calculators/cubic-yards-calculator',
      description: 'Calculate cubic yards, cubic feet, and cubic meters for concrete, mulch, gravel.',
      gradient: 'from-red-700 to-orange-700',
      tags: ['Volume', 'Concrete', 'Material']
    },
    {
      name: 'Tank Volume Calculator',
      href: '/calculators/tank-volume-calculator',
      description: 'Calculate tank capacity and fill volume for all shapes in gallons, liters, cubic feet.',
      gradient: 'from-amber-600 to-orange-600',
      tags: ['All Tank Shapes', 'Multiple Units', 'Fill Calculator']
    },
    {
      name: 'Feet and Inches Calculator',
      href: '/calculators/feet-and-inches-calculator',
      description: 'Add, subtract, multiply, divide feet and inches with fractions for construction.',
      gradient: 'from-orange-700 to-red-700',
      tags: ['Construction', 'Fractions', 'Carpentry']
    },
    {
      name: 'Celsius to Fahrenheit Converter',
      href: '/calculators/celsius-to-fahrenheit-converter',
      description: 'Convert Celsius to Fahrenheit with formula and conversion table.',
      gradient: 'from-red-600 to-orange-600',
      tags: ['Temperature', 'Celsius', 'Fahrenheit']
    },
    {
      name: 'Fahrenheit to Celsius Converter',
      href: '/calculators/fahrenheit-to-celsius-converter',
      description: 'Convert Fahrenheit to Celsius with formula and conversion table.',
      gradient: 'from-orange-600 to-amber-600',
      tags: ['Temperature', 'Fahrenheit', 'Celsius']
    },
    {
      name: 'Speed Distance Time Calculator',
      href: '/calculators/speed-distance-time-calculator',
      description: 'Calculate speed, distance, or time using the formula with unit conversion.',
      gradient: 'from-cyan-600 to-blue-600',
      tags: ['Speed', 'Distance', 'Time']
    },
    {
      name: 'mg to ml Converter',
      href: '/calculators/mg-to-ml-converter',
      description: 'Convert milligrams to milliliters with density. Works for water, oil, medications, and any substance.',
      gradient: 'from-purple-600 to-pink-600',
      tags: ['mg to ml', 'Density', 'Mass to Volume']
    },
    {
      name: 'ml to Grams Converter',
      href: '/calculators/ml-to-grams-converter',
      description: 'Convert milliliters to grams for cooking ingredients. Works for water, milk, flour, sugar, oil, honey and 30+ ingredients.',
      gradient: 'from-orange-500 to-amber-500',
      tags: ['ml to g', 'Cooking', 'Ingredients']
    },
    {
      name: 'Steps to Calories Calculator',
      href: '/calculators/steps-to-calories-calculator',
      description: 'Calculate calories burned from walking steps based on weight, height, and walking speed. Find out how many calories 10,000 steps burns.',
      gradient: 'from-green-600 to-teal-600',
      tags: ['Walking', 'Calories Burned', 'Steps']
    },
    {
      name: 'Nm to ft-lbs Converter',
      href: '/calculators/nm-to-ft-lbs-converter',
      description: 'Convert torque between Newton-meters and foot-pounds. Includes inch-pounds, kgf-m, and common automotive torque specs.',
      gradient: 'from-orange-600 to-red-600',
      tags: ['Torque', 'N·m to ft·lbs', 'Automotive']
    },
    {
      name: 'Steps to Miles Calculator',
      href: '/calculators/steps-to-miles-calculator',
      description: 'Convert walking steps to miles, kilometers, and other distances. Calculate based on stride length, height, or averages.',
      gradient: 'from-teal-600 to-cyan-600',
      tags: ['Steps', 'Distance', 'Walking']
    },
    {
      name: 'Steps to Km Calculator',
      href: '/calculators/steps-to-km-calculator',
      description: 'Convert walking steps to kilometers. Calculate how far 10,000 steps is in km based on stride length, height, or gender averages.',
      gradient: 'from-blue-600 to-indigo-600',
      tags: ['Steps to km', '10000 steps', 'Walking']
    },
    {
      name: 'Dog Size Calculator',
      href: '/calculators/dog-size-calculator',
      description: 'Predict your puppy\'s adult weight and size category. Enter age and current weight to estimate how big your dog will grow.',
      gradient: 'from-amber-500 to-orange-600',
      tags: ['Puppy', 'Adult Weight', 'Pet']
    },
    {
      name: 'Calories Burned Walking Calculator',
      href: '/calculators/calories-burned-walking-calculator',
      description: 'Calculate calories burned while walking by steps, distance, or time. Works for treadmill and outdoor walking with slope adjustment.',
      gradient: 'from-green-500 to-emerald-600',
      tags: ['Walking', 'Calories', 'Fitness']
    },
    {
      name: 'Kg to Lb Converter',
      href: '/calculators/kg-to-lb-converter',
      description: 'Convert kilograms to pounds and pounds to kilograms instantly. Free weight converter with step-by-step solutions.',
      gradient: 'from-teal-600 to-green-600',
      tags: ['Weight', 'kg to lbs', 'Mass']
    },
  ],
  'Time & Date': [
    {
      name: 'Age Calculator',
      href: '/calculators/age-calculator',
      description: 'Calculate age in years, months, days, hours from date of birth with precision.',
      gradient: 'from-purple-600 to-pink-600',
      tags: ['Age', 'Date', 'Birthday']
    },
    {
      name: 'Birth Year Calculator',
      href: '/calculators/birth-year-calculator',
      description: 'Find birth year from age or calculate age from birth year. Includes generation info and Chinese zodiac.',
      gradient: 'from-pink-600 to-rose-600',
      tags: ['Birth Year', 'Age', 'Generation']
    },
    {
      name: 'Hours Calculator',
      href: '/calculators/hours-calculator',
      description: 'Calculate hours and minutes between times for work hours, duration, timesheet.',
      gradient: 'from-indigo-600 to-purple-600',
      tags: ['Work Hours', 'Duration', 'Timesheet']
    },
    {
      name: 'Work Hours Calculator',
      href: '/calculators/work-hours-calculator',
      description: 'Calculate total work hours with break time, overtime, and weekly hours.',
      gradient: 'from-blue-600 to-indigo-600',
      tags: ['Work', 'Overtime', 'Weekly']
    },
    {
      name: 'Military Time Converter',
      href: '/calculators/military-time-converter',
      description: 'Convert between 12-hour and 24-hour military time format with chart.',
      gradient: 'from-green-600 to-teal-600',
      tags: ['24-Hour', 'Military', 'Time']
    },
    {
      name: 'Time to Decimal Calculator',
      href: '/calculators/time-to-decimal-calculator',
      description: 'Convert time to decimal hours for payroll and timesheet calculations.',
      gradient: 'from-cyan-600 to-blue-600',
      tags: ['Decimal', 'Payroll', 'Hours']
    },
    {
      name: 'Time Until Calculator',
      href: '/calculators/time-until-calculator',
      description: 'Calculate countdown to any future date with live updates. Get time until in years, months, weeks, days, hours, minutes, seconds.',
      gradient: 'from-orange-600 to-pink-600',
      tags: ['Countdown', 'Live Timer', 'Events']
    },
    {
      name: 'Download Time Calculator',
      href: '/calculators/download-time-calculator',
      description: 'Calculate how long file downloads will take based on file size and internet speed. Works with MB, GB, TB and Mbps, Gbps.',
      gradient: 'from-blue-600 to-purple-600',
      tags: ['Download', 'Internet Speed', 'File Size']
    },
  ],
  'Number Converters': [
    {
      name: 'Numbers to Words Converter',
      href: '/calculators/numbers-to-words-converter',
      description: 'Convert numbers to words in Indian and International number system.',
      gradient: 'from-blue-600 to-purple-600',
      tags: ['Numbers', 'Words', 'Convert']
    },
    {
      name: 'Roman Numeral Converter',
      href: '/calculators/roman-numeral-converter',
      description: 'Convert between Roman numerals and Arabic numbers with validation.',
      gradient: 'from-purple-600 to-pink-600',
      tags: ['Roman', 'Numerals', 'Convert']
    },
    {
      name: 'Scientific Notation Converter',
      href: '/calculators/scientific-notation-converter',
      description: 'Convert numbers to and from scientific notation with exponent display.',
      gradient: 'from-green-600 to-emerald-600',
      tags: ['Scientific', 'Notation', 'Exponent']
    },
    {
      name: 'Rounding Numbers Calculator',
      href: '/calculators/rounding-numbers-calculator',
      description: 'Round numbers to nearest whole, tenth, hundredth, or custom decimal place.',
      gradient: 'from-orange-600 to-red-600',
      tags: ['Rounding', 'Decimal', 'Place']
    },
  ],
  'General Tools': [
    {
      name: 'Basic Calculator',
      href: '/calculators/basic-calculator',
      description: 'Simple calculator for basic arithmetic operations - add, subtract, multiply, divide.',
      gradient: 'from-gray-600 to-slate-600',
      tags: ['Basic', 'Arithmetic', 'Simple']
    },
  ],
};

const categories = Object.keys(calculators);

export default function CalculatorsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const scrollToCategory = (category: string) => {
    setActiveCategory(category);
    const element = document.getElementById(category.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm py-3 px-4 sm:px-6 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-2 text-xs sm:text-sm overflow-x-auto">
            <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center whitespace-nowrap">
              <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium">Calculators</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
            <Calculator className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-300 mb-3 sm:mb-0 sm:mr-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Free Online Calculators
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
            {categories.length} categories with 70+ calculators for students, professionals, and everyone. Calculate accurately, plan smartly, and achieve your goals.
          </p>
        </div>
      </section>

      {/* Category Quick Navigation - Mobile Optimized */}
      <div className="sticky top-[52px] z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center mb-2 sm:mb-3">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
            <h2 className="text-sm sm:text-base font-semibold text-gray-800">Jump to Category</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => scrollToCategory(category)}
                className={`text-left text-xs sm:text-sm px-3 py-2 rounded-lg border transition-all ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium truncate">{category}</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 ml-1 flex-shrink-0" />
                </div>
                <span className="text-[10px] sm:text-xs text-gray-500 mt-0.5 block">
                  {calculators[category as keyof typeof calculators].length} tools
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        {categories.map((category) => (
          <section
            key={category}
            id={category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
            className="mb-12 sm:mb-16 scroll-mt-32"
          >
            {/* Category Header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center mb-2">
                {category === 'Academic & Education' && <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 mr-3" />}
                {category === 'Financial & Investment' && <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-green-600 mr-3" />}
                {category === 'Percentage & Math' && <Percent className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600 mr-3" />}
                {category === 'Statistics & Data' && <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600 mr-3" />}
                {category === 'Fractions & Decimals' && <Hash className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-600 mr-3" />}
                {category === 'Business & Commerce' && <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600 mr-3" />}
                {category === 'Measurement & Conversion' && <Ruler className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600 mr-3" />}
                {category === 'Time & Date' && <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-pink-600 mr-3" />}
                {category === 'Number Converters' && <Hash className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 mr-3" />}
                {category === 'General Tools' && <Calculator className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600 mr-3" />}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{category}</h2>
              </div>
              <p className="text-sm sm:text-base text-gray-600 ml-9 sm:ml-10">
                {calculators[category as keyof typeof calculators].length} calculator{calculators[category as keyof typeof calculators].length !== 1 ? 's' : ''} available
              </p>
            </div>

            {/* Calculator Cards Grid - Fully Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {calculators[category as keyof typeof calculators].map((calc) => (
                <Link key={calc.href} href={calc.href} className="block h-full group">
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border-2 border-gray-100 hover:border-blue-500 transition-all hover:shadow-xl h-full flex flex-col">
                    <div className="flex items-start mb-3 sm:mb-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${calc.gradient} text-white rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 ml-3 leading-tight">
                        {calc.name}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 flex-grow leading-relaxed">
                      {calc.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform mb-3">
                      <span>Use Calculator</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {calc.tags.map((tag) => (
                        <span key={tag} className="text-[10px] sm:text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Back to Top Button - Mobile Optimized */}
        <div className="text-center mt-12 sm:mt-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 rotate-180" />
            Back to Top
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white mt-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">

            {/* About Section */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <Calculator className="w-8 h-8 text-yellow-400 mr-3" />
                <h3 className="text-xl font-bold">The Tutor Bridge</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Your trusted source for accurate online calculators. From academic tools to financial planning, we provide free, comprehensive calculators for everyone.
              </p>
              <div className="flex items-center text-sm text-gray-400">
                <span>© 2024 The Tutor Bridge</span>
              </div>
            </div>

            {/* Quick Links - Academic */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-blue-400" />
                Academic Tools
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/calculators/college-gpa-calculator" className="text-gray-300 hover:text-white transition-colors">
                    College GPA Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/high-school-gpa-calculator" className="text-gray-300 hover:text-white transition-colors">
                    High School GPA
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/grade-calculator" className="text-gray-300 hover:text-white transition-colors">
                    Grade Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/percentage-calculator" className="text-gray-300 hover:text-white transition-colors">
                    Percentage Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/cgpa-to-percentage-calculator" className="text-gray-300 hover:text-white transition-colors">
                    CGPA to Percentage
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links - Financial */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                Financial Tools
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/calculators/sip-calculator" className="text-gray-300 hover:text-white transition-colors">
                    SIP Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/emi-calculator" className="text-gray-300 hover:text-white transition-colors">
                    EMI Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/income-tax-calculator" className="text-gray-300 hover:text-white transition-colors">
                    Income Tax Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/compound-interest-calculator" className="text-gray-300 hover:text-white transition-colors">
                    Compound Interest
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/ppf-calculator" className="text-gray-300 hover:text-white transition-colors">
                    PPF Calculator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links - Resources */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-purple-400" />
                Resources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/study-resources" className="text-gray-300 hover:text-white transition-colors">
                    Study Resources
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Category Links - Compact */}
          <div className="border-t border-gray-700 pt-8 mb-8">
            <h4 className="text-sm font-semibold mb-4 text-gray-400 uppercase tracking-wider">All Calculator Categories</h4>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setTimeout(() => scrollToCategory(category), 100);
                  }}
                  className="text-xs sm:text-sm px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-full transition-all border border-gray-700 hover:border-gray-600"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400 text-center sm:text-left">
                All calculators are free to use. Results are for informational purposes only.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
