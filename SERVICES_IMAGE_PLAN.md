# Services Section - Image Generation Plan

**Date:** February 17, 2026  
**Status:** 🔄 Pending API Availability  
**Component:** `Services.tsx`  
**Goal:** Generate 5 service-specific images

---

## 🎯 Current Situation

The Services section currently uses **repurposed images** that don't perfectly match each service:

| Service | Current Image | Issue |
|---------|--------------|-------|
| **Roof Repair** | `service_storm_damage_assessment.png` | Shows inspection, not repair work |
| **Roof Replacement** | `service_asphalt_shingles.png` | Good - shows completed roof ✅ |
| **Storm Damage Restoration** | `about_roofers_working.png` | Generic work, not storm damage |
| **Proactive Maintenance** | `service_metal_roof.png` | Shows finished roof, not maintenance |
| **Gutter Installation** | `service_ventilation.png` | Shows ventilation, not gutters |

---

## 📋 Images to Generate

### 1. Roof Repair Services
**Filename:** `service_roof_repair.png`

**Prompt:**
```
Professional roofer repairing damaged asphalt shingles on residential roof in Georgia. Close-up action shot of skilled craftsman's hands replacing broken shingles, using professional tools. Safety equipment visible, work in progress. Damaged shingles being removed and new ones installed. Natural daylight, photorealistic documentary style. Shows repair expertise, attention to detail, quality craftsmanship. Suburban Georgia home setting.
```

**Key Elements:**
- ✅ Hands-on repair work in progress
- ✅ Damaged shingles being replaced
- ✅ Professional tools visible
- ✅ Safety equipment
- ✅ Action shot showing expertise

**Why This Works:**
- Shows actual repair process
- Demonstrates hands-on craftsmanship
- Builds trust through visible expertise
- Matches "Roof Repair Services" perfectly

---

### 2. Roof Replacement Services
**Filename:** `service_roof_replacement.png`

**Current Image:** `service_asphalt_shingles.png` ✅ **KEEP THIS ONE**

**Note:** The current image already works well - it shows a beautiful completed roof replacement. However, if you want to show the replacement *process*, use this prompt:

**Alternative Prompt:**
```
Complete roof replacement in progress on suburban Georgia home. Professional roofing crew installing brand new architectural shingles, multiple workers on roof in safety gear. Partially completed roof showing transformation from old to new. Stacks of premium Owens Corning shingles visible, professional equipment and tools. Blue sky, sunny day. Photorealistic showing full replacement process, teamwork, quality installation. Modern two-story home.
```

**Key Elements:**
- ✅ Multiple crew members working
- ✅ Replacement in progress (before/after visible)
- ✅ Premium materials (Owens Corning)
- ✅ Professional equipment
- ✅ Teamwork and coordination

---

### 3. Storm Damage Restoration
**Filename:** `service_storm_damage.png`

**Prompt:**
```
Professional roofing inspector documenting storm and hail damage on residential roof. Inspector with clipboard and camera examining damaged shingles, visible hail impact marks and wind damage. Close-up showing damaged asphalt shingles with dents and missing granules. Professional assessment in progress, documentation for insurance claim. Cloudy sky suggesting recent storm. Photorealistic, shows expertise in damage assessment. Suburban Georgia home.
```

**Key Elements:**
- ✅ Visible storm/hail damage
- ✅ Inspector with clipboard and camera
- ✅ Documentation process
- ✅ Insurance claim context
- ✅ Professional assessment
- ✅ Cloudy/stormy atmosphere

**Why This Works:**
- Shows damage assessment expertise
- Emphasizes insurance coordination
- Demonstrates thorough documentation
- Builds trust in claims process

---

### 4. Proactive Roof Maintenance
**Filename:** `service_maintenance.png`

**Prompt:**
```
Professional roofer performing preventive maintenance inspection on well-maintained residential roof. Technician in safety gear carefully inspecting roof condition, checking shingles and flashing. Clean, well-maintained roof in good condition. Inspector taking notes on clipboard, professional tools visible. Beautiful suburban Georgia home with quality roof. Bright sunny day, blue sky. Photorealistic showing proactive maintenance, preventive care, professional inspection service.
```

**Key Elements:**
- ✅ Inspector performing routine check
- ✅ Well-maintained roof (not damaged)
- ✅ Clipboard with notes
- ✅ Professional inspection tools
- ✅ Preventive care focus
- ✅ Sunny, positive atmosphere

**Why This Works:**
- Shows proactive vs reactive approach
- Emphasizes prevention over repair
- Demonstrates thoroughness
- Positive, sunny setting (no emergency)

---

### 5. Gutter Installation Services
**Filename:** `service_gutter_installation.png`

**Prompt:**
```
Professional installer working on seamless gutter installation on residential home. Close-up of installer attaching white or tan seamless gutter system to home fascia, using professional tools and equipment. Ladder visible, precision installation work. Clean, professional gutter installation in progress. Suburban Georgia house with nice landscaping. Natural daylight, photorealistic. Shows quality gutter installation, professional technique, attention to detail.
```

**Key Elements:**
- ✅ Seamless gutter system
- ✅ Installation in progress
- ✅ Professional tools and ladder
- ✅ Precision work visible
- ✅ Clean, quality installation
- ✅ White/tan gutters (common colors)

**Why This Works:**
- Shows actual gutter installation
- Demonstrates precision and care
- Highlights seamless system quality
- Matches service description perfectly

---

## 🔄 Implementation Steps

### When API Becomes Available:

1. **Generate Images** (in order of priority)
   ```bash
   # Priority 1: Most mismatched
   - service_gutter_installation.png
   - service_roof_repair.png
   - service_storm_damage.png
   
   # Priority 2: Good to have
   - service_maintenance.png
   
   # Priority 3: Optional (current is good)
   - service_roof_replacement.png (alternative)
   ```

2. **Save to Public Folder**
   ```bash
   cp ~/.gemini/antigravity/brain/[conversation-id]/service_*.png /public/
   ```

3. **Update Services.tsx**
   ```tsx
   const services = [
     {
       title: 'Roof Repair Services',
       image: '/service_roof_repair.png', // NEW
     },
     {
       title: 'Roof Replacement Services',
       image: '/service_asphalt_shingles.png', // KEEP
     },
     {
       title: 'Storm Damage Restoration',
       image: '/service_storm_damage.png', // NEW
     },
     {
       title: 'Proactive Roof Maintenance',
       image: '/service_maintenance.png', // NEW
     },
     {
       title: 'Gutter Installation Services',
       image: '/service_gutter_installation.png', // NEW
     },
   ];
   ```

4. **Test & Verify**
   - Check all images load correctly
   - Verify they match service descriptions
   - Ensure consistent quality and style
   - Test responsive behavior

---

## 🎨 Design Consistency Guidelines

All service images should maintain:

### Visual Style
- **Photorealistic** - Documentary/professional photography
- **Natural lighting** - Daylight, no harsh shadows
- **Georgia setting** - Suburban residential homes
- **Professional quality** - High-resolution, crisp details

### Color Palette
- **Roof colors:** Charcoal gray, brown, tan (common choices)
- **Home colors:** Brick, white siding, stone
- **Sky:** Blue with white clouds (positive, sunny)
- **Brand accent:** Red visible where appropriate (tools, equipment)

### Composition
- **Focus:** Clear subject (worker, damage, installation)
- **Context:** Visible home/roof context
- **Action:** Work in progress (not just finished product)
- **Safety:** Equipment and gear visible
- **Professionalism:** Clean, organized workspace

### Emotional Tone
- **Trustworthy** - Professional, competent workers
- **Approachable** - Friendly, not intimidating
- **Expert** - Skilled craftsmanship visible
- **Quality-focused** - Attention to detail evident

---

## 📊 Expected Impact

### Before (Current Images)
- ❌ Generic images repurposed from other sections
- ❌ Don't specifically show each service
- ❌ Confusing for users (ventilation ≠ gutters)
- ❌ Missed opportunity to showcase expertise

### After (New Service-Specific Images)
- ✅ Each image perfectly matches its service
- ✅ Shows actual work being performed
- ✅ Demonstrates specific expertise
- ✅ Builds trust through relevant visuals
- ✅ Better user understanding of services
- ✅ Improved conversion (users see what they get)

---

## 🚀 Alternative: Use Existing Images Better

If image generation continues to be unavailable, here's a better mapping using existing images:

```tsx
const services = [
  {
    title: 'Roof Repair Services',
    image: '/service_storm_damage_assessment.png', // Shows inspection/assessment
  },
  {
    title: 'Roof Replacement Services',
    image: '/service_asphalt_shingles.png', // Perfect - completed roof ✅
  },
  {
    title: 'Storm Damage Restoration',
    image: '/service_storm_damage_assessment.png', // Shows damage assessment
  },
  {
    title: 'Proactive Roof Maintenance',
    image: '/service_metal_roof.png', // Shows quality maintained roof
  },
  {
    title: 'Gutter Installation Services',
    image: '/blog_expert_roofing_services.png', // Shows team/installation work
  },
];
```

This isn't perfect, but it's better than the current mapping.

---

## 📝 Quick Reference: Image Prompts

Copy these prompts when API is available:

### Roof Repair
```
Professional roofer repairing damaged asphalt shingles on residential roof in Georgia. Close-up action shot of skilled craftsman's hands replacing broken shingles, using professional tools. Safety equipment visible, work in progress. Damaged shingles being removed and new ones installed. Natural daylight, photorealistic documentary style. Shows repair expertise, attention to detail, quality craftsmanship. Suburban Georgia home setting.
```

### Storm Damage
```
Professional roofing inspector documenting storm and hail damage on residential roof. Inspector with clipboard and camera examining damaged shingles, visible hail impact marks and wind damage. Close-up showing damaged asphalt shingles with dents and missing granules. Professional assessment in progress, documentation for insurance claim. Cloudy sky suggesting recent storm. Photorealistic, shows expertise in damage assessment. Suburban Georgia home.
```

### Maintenance
```
Professional roofer performing preventive maintenance inspection on well-maintained residential roof. Technician in safety gear carefully inspecting roof condition, checking shingles and flashing. Clean, well-maintained roof in good condition. Inspector taking notes on clipboard, professional tools visible. Beautiful suburban Georgia home with quality roof. Bright sunny day, blue sky. Photorealistic showing proactive maintenance, preventive care, professional inspection service.
```

### Gutter Installation
```
Professional installer working on seamless gutter installation on residential home. Close-up of installer attaching white or tan seamless gutter system to home fascia, using professional tools and equipment. Ladder visible, precision installation work. Clean, professional gutter installation in progress. Suburban Georgia house with nice landscaping. Natural daylight, photorealistic. Shows quality gutter installation, professional technique, attention to detail.
```

---

## ✅ Next Steps

1. **Wait for API availability** (retry in ~45 seconds)
2. **Generate images** using prompts above
3. **Save to /public folder**
4. **Update Services.tsx** with new image paths
5. **Test on dev server**
6. **Document completion**

---

**Created by:** Antigravity AI  
**Date:** February 17, 2026  
**Status:** 🔄 Pending API Capacity  
**Priority:** Medium (current images work, but not optimal)
