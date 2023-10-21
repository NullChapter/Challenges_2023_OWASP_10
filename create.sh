#!/bin/bash

base_dir="."

categories=("Injection" "Broken Authentication" "Sensitive Data Exposure" "XML External Entities (XXE)" "Broken Access Control" "Security Misconfiguration" "Cross-Site Scripting (XSS)" "Insecure Deserialization" "Using Components with Known Vulnerabilities" "Insufficient Logging and Monitoring")

for category in "${categories[@]}"
do
    category_dir="$base_dir/$category"
    mkdir -p "$category_dir/easy"
    mkdir -p "$category_dir/hard"

    touch "$category_dir/easy/README.md"
    touch "$category_dir/hard/README.md"

    echo "# OWASP Top 10 CTF Challenge - $category (Easy)" >> "$category_dir/easy/README.md"
    echo "Description of the easy challenge goes here." >> "$category_dir/easy/README.md"
    echo "" >> "$category_dir/easy/README.md"
    echo "## Flag Format" >> "$category_dir/easy/README.md"
    echo "Flag format for easy challenge." >> "$category_dir/easy/README.md"

    echo "# OWASP Top 10 CTF Challenge - $category (Hard)" >> "$category_dir/hard/README.md"
    echo "Description of the hard challenge goes here." >> "$category_dir/hard/README.md"
    echo "" >> "$category_dir/hard/README.md"
    echo "## Flag Format" >> "$category_dir/hard/README.md"
    echo "Flag format for hard challenge." >> "$category_dir/hard/README.md"
done
