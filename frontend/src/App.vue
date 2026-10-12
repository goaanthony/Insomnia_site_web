<template>
  <div id="smooth-wrapper" class="relative">
    <!-- Fixed NavBar -->
    <NavBar />

    <!-- Page Sections (scrollytelling order) -->
    <HeroSection />
    <UniverseSection />
    <HorizontalCardsSection />
    <FeaturesSection />
    <CommunitySection />
    <JoinSection />
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { useScrollAnimations } from '@/composables/useScrollAnimations'
import NavBar from '@/components/NavBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import UniverseSection from '@/components/UniverseSection.vue'
import HorizontalCardsSection from '@/components/HorizontalCardsSection.vue'
import FeaturesSection from '@/components/FeaturesSection.vue'
import CommunitySection from '@/components/CommunitySection.vue'
import JoinSection from '@/components/JoinSection.vue'
import FooterSection from '@/components/FooterSection.vue'

useScrollAnimations()
</script>