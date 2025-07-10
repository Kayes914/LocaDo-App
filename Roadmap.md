# 🎨 UX Design Components by Page

---

## 🏠 1. **Home Page**

### 🧩 Key Components:

- **Top App Bar:**
    - App logo / name
    - Location selector (dropdown or pin icon)
    - Notification bell icon (🔔)
- **Search Bar (Sticky):**
    - Placeholder: "Search items, help, services..."
    - Mic icon (optional for voice input)
    - Filter icon
- **Horizontal Scroll Sections (Cards):**
    - “Buy & Sell”
    - “Need Help?”
    - “Find Work / Offer Service”
- **Post Shortcut Buttons (Below Sections):**
    - ➕ Post Help
    - ➕ Sell Item
    - ➕ Find Expert
- **Bottom Navigation Bar:**
    - Icons: 🏠 Home | ➕ Post | 🧑‍🔧 Experts | 📋 My Posts | 👤 Profile
    - Highlight active tab

---

## 🛍️ 2. **Post Listing Page**

### 📍 Page has 3 Tabs (or Bottom Sheet):

**Sell / Help / Work**

---

### A. Sell / Rent Item

- **Input Fields:**
    - Title (text field)
    - Description (multi-line text)
    - Price (number)
    - Toggle: Rent ⬅️ ➡️ Sell
    - Dropdown: Category (books, tech, etc.)
- **Image Upload Area:**
    - Upload 1–4 images
    - Preview thumbnails
    - Remove/reorder option
- **Location:**
    - Auto-fill current GPS location
    - Option to manually pin on map
- **Contact Option:**
    - Radio buttons: In-app Chat / Phone Call / Both
- **Post Button (Floating CTA)**

---

### B. Ask for Help

- **Text Field:**
    - “I need help with…” (open-ended)
- **Dropdown:**
    - Category: Tech, Study, Home, Other
- **Optional Image Upload**
- **Urgency Toggle:**
    - Now / Today / This Week
- **Post Button**

---

### C. Post Work

- **Input Fields:**
    - What do you need? (title)
    - Description (multi-line)
    - Date & Time picker
    - Optional Budget
    - Category dropdown: Electrician, Tutor, etc.
- **Location Picker (Auto + Manual Pin)**
- **Contact Method**
- **Post Button**

---

## 🧑‍🔧 3. **Experts Page**

### 🧩 Components:

- **Search Bar:**
    - Placeholder: "Search Plumber in Gulshan..."
    - Auto-suggestions or filters
- **Filter Panel (Sticky or Modal):**
    - Profession dropdown
    - Distance slider (1–10 km)
    - Verified only toggle
- **Expert Cards (Repeatable):**
    - Name
    - Profile Picture (optional)
    - Skill/Profession
    - Years of experience
    - ★ Rating
    - Distance from user
    - Contact button (Chat or Call)

---

## 📋 4. **My Posts Page**

### 🧩 Components:

- **Sectioned Layout (Tabs or Expandables):**
    - My Buy/Sell Listings
    - My Help Posts
    - My Job Posts
    - Responses Received
- **Post Cards (Expandable):**
    - Status: Active / Expired / Hidden
    - Edit / Delete Buttons
    - View Responses
- **Response Modal or List:**
    - User preview
    - Chat button
    - Accept or mark as completed

---

## 👤 5. **Profile Page**

### 🧩 Components:

- **User Information Card:**
    - Name, Phone (non-editable if verified)
    - Area / Locality dropdown
    - Trust Score 🌟 indicator (with tooltip)
    - Skills (tags/chips)
- **Edit Button (for optional fields)**
- **Settings Section:**
    - Change Language (dropdown)
    - Logout
    - Delete Account (confirmation modal)
- **Help & Feedback link**

---

## 📨 6. **In-App Chat**

### 🧩 Components:

- **Thread List (Inbox):**
    - Profile image, Name
    - Preview of last message
    - Timestamp
    - Unread badge
- **Chat Window:**
    - Header: Name, phone icon, back button
    - Message bubble layout (text/image)
    - Timestamp
    - Input box (text + image)
    - Send button
    - Block or report option in top menu

---

## 🔍 7. **Search Results Page**

### 🧩 Components:

- **Sticky Search Bar**
- **Sort/Filter Bar**
    - Sort by date, distance, rating
    - Category tags
- **Grid/List View Toggle (optional)**
- **Result Cards:**
    - Item or expert preview (image, title, distance, rating)
    - Tap → opens Post Detail Page

---

## ➕ 8. **Post Detail Page**

### 🧩 Components:

- Title + Category badge
- Image carousel (1–4 images)
- Description
- Location map (mini)
- Poster Info:
    - Name, rating, verification badge
- Buttons:
    - Chat Now
    - Call (if allowed)
    - Report Post

---

## ⚙️ 9. **Settings Page**

### 🧩 Components:

- Change Language
- App Version
- Privacy Policy / Terms
- Feedback Form
- Delete Account (with modal confirmation)
- Logout

---

## 🚫 10. **Report/Block Modal**

### 🧩 Components:

- Modal overlay with options:
    - Spam
    - Abuse
    - Fake Post
    - Other (text box)
- Submit button
- Confirmation toast/snackbar

---

## 🔔 11. **Notifications Page**

### 🧩 Components:

- List of notifications:
    - “Someone replied to your help post”
    - “New expert listed in your area”
- Mark all as read
- Tap → opens linked post/chat

---

## 📍 12. **Location Picker**

### 🧩 Components:

- Auto-detect button (GPS)
- Map with draggable pin
- Confirm Location button
- Optional: Saved addresses

# Tech Stack:

1. React Native
2. expo