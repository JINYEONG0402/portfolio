---
title: Contact
date: 2022-10-24

type: landing

sections:
  - block: contact
    content:
      title: Contact
      text: |-
        여기로 이메일 보내주세요!

      email: gjy1614@jbnu.ac.kr
      phone: 010-4895-8655
      address:
        street: 백제대로 567
        city: 전주시 덕진구
        region: 전라북도
        postcode: "54896"
        country: 대한민국
        country_code: ko
      coordinates:
        latitude: "35.8460469"
        longitude: "127.1346038"
      directions: 공과대학 7호관
      office_hours:
        - everyday 10:00 - 18:00

      appointment_url: "https://open.kakao.com/o/s1GLezSg"
      #contact_links:
      #  - icon: comments
      #    icon_pack: fas
      #    name: Discuss on Forum
      #    link: 'https://discourse.gohugo.io'

      # Automatically link email and phone or display as text?
      autolink: true

      # Email form provider
      form:
        provider: netlify
        formspree:
          id:
        netlify:
          # Enable CAPTCHA challenge to reduce spam?
          captcha: false
    design:
      columns: "1"

  - block: markdown
    content:
      title:
      subtitle: ""
      text:
    design:
      columns: "1"
      background:
        image:
          filename: ct.jpg
          filters:
            brightness: 1
          parallax: false
          position: center
          size: cover
          text_color_light: true
      spacing:
        padding: ["20px", "0", "20px", "0"]
      css_class: fullscreen
---
