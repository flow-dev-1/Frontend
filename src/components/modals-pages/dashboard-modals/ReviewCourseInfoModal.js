import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import course_image from '../../../assets/course-image.png'
import dot from '../../../assets/radix-icons--dot-filled.svg'

export default function ReviewCourseInfoModal({ course, onClose }) {
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }
  // console.log(course?.image)

  return (
    <div className='course-info-modal overflow-y-modal '>
          {course?.title === "Resilience & Grit" && (
        <div>
          <div
            className="py-2 px-4 course-objectives"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            {/* Header */}
            <div
              className="course-info-modal-header"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <h2 className="mb-0" style={{ fontSize: "36px" }}>
                {course?.title}
              </h2>
              <button
                className="close-btn"
                onClick={closeModal}
                style={{ border: "none", background: "none", cursor: "pointer" }}
              >
                <Icon width={24} icon="mingcute:close-fill" />
              </button>
            </div>

            <hr className="w-100 h-auto mb-2 " />

            {/* Banner */}
            <div>
              <img
                style={{ width: "100%", height: "160px", objectFit: "cover" }}
                alt=""
                src={course.banner}
              />
            </div>

            {/* Body */}
            <div className="course-info-modal-body">
              <p style={{ fontSize: "20px", color: "#275DAD" }}>Course Overview</p>
              <p style={{ paddingLeft: ".5rem" }}>
                Welcome to the Resilience and Grit Curriculum! Over the next several weeks,
                we’ll dive into the concepts of resilience and grit, and you will be equipped
                with the tools to overcome challenges, adapt to change, and persevere in the face
                of obstacles. By the end of this journey, you’ll be better prepared to tackle life’s
                difficulties with confidence and determination.
              </p>

              <p style={{ paddingLeft: ".5rem", marginTop: "1rem" }}>
                Here’s what you can look forward to:
              </p>

              <div className="mt-4">
                <p style={{ fontSize: "20px", color: "#275DAD" }}>Course Objectives</p>
                <ul>
                  {/* Week 1 */}
                  <li>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                      <img src={dot} />
                      <p style={{ fontSize: "15px", color: "#275DAD" }}>
                        Week 1: Introduction to Resilience and Grit
                      </p>
                    </div>
                    <p style={{ paddingLeft: ".5rem" }}>
                      What We’ll Do: We’ll begin by understanding the concepts of resilience
                      and grit. You’ll learn why they’re important, and how they help you achieve
                      your goals. Through engaging activities, you’ll reflect on how you’ve already
                      demonstrated resilience in your life.
                    </p>
                    <p>
                      Why It Matters: Resilience and grit empower you to bounce back
                      from setbacks and pursue your goals with determination.
                    </p>
                  </li>

                  {/* Week 2 */}
                  <li>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                      <img src={dot} />
                      <p style={{ fontSize: "15px", color: "#275DAD" }}>
                        Week 2: Developing Resilience
                      </p>
                    </div>
                    <p style={{ paddingLeft: ".5rem" }}>
                      What We’ll Do: This week focuses on building resilience. You’ll
                      learn the foundations of resilience, referred to as the 7 C’s,
                      and recognize which you have and which you are yet to develop.
                    </p>
                    <p>
                      Why It Matters: Developing resilience equips you with the tools
                      to stay steady during tough times and maintain emotional balance.
                    </p>
                  </li>

                  {/* Week 3 */}
                  <li>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                      <img src={dot} />
                      <p style={{ fontSize: "15px", color: "#275DAD" }}>
                        Week 3: Understanding the Concept of Adaptability
                      </p>
                    </div>
                    <p style={{ paddingLeft: ".5rem" }}>
                      What We’ll Do: We’ll explore adaptability—your ability to adjust
                      to new situations and challenges. You’ll practice shifting
                      perspectives and staying flexible in the face of change, with
                      real-life examples of animals to reinforce these concepts.
                    </p>
                    <p>
                      Why It Matters: Adaptability is a key part of resilience. By
                      learning to embrace change, you’ll be better prepared to thrive
                      in a constantly evolving world.
                    </p>
                  </li>

                  {/* Week 4 */}
                  <li>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                      <img src={dot} />
                      <p style={{ fontSize: "15px", color: "#275DAD" }}>
                        Week 4: The Role of Support Systems
                      </p>
                    </div>
                    <p style={{ paddingLeft: ".5rem" }}>
                      What We’ll Do: We’ll highlight the importance of support systems.
                      You’ll learn how to identify and build relationships with people
                      who uplift and encourage you, and recognize the value of both
                      giving and receiving support.
                    </p>
                    <p>
                      Why It Matters: Support systems remind you that you’re not alone
                      and help you navigate challenges with confidence.
                    </p>
                  </li>

                  {/* Week 5 */}
                  <li>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                      <img src={dot} />
                      <p style={{ fontSize: "15px", color: "#275DAD" }}>
                        Week 5: Coping Skills
                      </p>
                    </div>
                    <p style={{ paddingLeft: ".5rem" }}>
                      What We’ll Do: We’ll dive into coping skills—tools you can use to
                      manage stress and maintain emotional well-being, such as creative
                      outlets and physical activities.
                    </p>
                    <p>
                      Why It Matters: Coping skills help you regulate emotions and
                      respond to challenges in healthy ways, setting you up for success
                      in both your personal and academic life.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {course?.title === "Compassion" && (
        <div>
          <div
            className="py-2 px-4 course-objectives"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            {/* Header */}
            <div
              className="course-info-modal-header"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <h2 className="mb-0" style={{ fontSize: "36px" }}>
                {course?.title}
              </h2>
              <button
                className="close-btn"
                onClick={closeModal}
                style={{ border: "none", background: "none", cursor: "pointer" }}
              >
                <Icon width={24} icon="mingcute:close-fill" />
              </button>
            </div>

            <hr className="w-100 h-auto mb-2 " />

            {/* Banner */}
            <div>
              <img
                style={{ width: "100%", height: "160px", objectFit: "cover" }}
                alt=""
                src={course.banner}
              />
            </div>

            {/* Body */}
            <div className="course-info-modal-body">
              <p style={{ fontSize: "20px", color: "#275DAD" }}>Course Overview</p>
              <p style={{ paddingLeft: ".5rem" }}>
                Welcome to the Compassion Curriculum! Over the next several weeks, we’ll explore the
                concept of compassion, beginning with understanding what it means to show care and
                kindness toward yourself and others. This journey will equip you with the skills to
                build deeper connections, learn empathy, and navigate life with greater understanding
                and purpose.
              </p>

              <p style={{ paddingLeft: ".5rem", marginTop: "1rem" }}>
                Here’s what you can look forward to:
              </p>

              <div className="mt-4">
                <p style={{ fontSize: "20px", color: "#275DAD" }}>Course Objectives</p>
                <ul>
                  {/* Week 1 */}
                  <li>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                      <img src={dot} />
                      <p style={{ fontSize: "15px", color: "#275DAD" }}>
                        Week 1: Introduction to Compassion
                      </p>
                    </div>
                    <p style={{ paddingLeft: ".5rem" }}>
                      What We’ll Do: We’ll begin by exploring the meaning of compassion—
                      what it is, why it’s important, and how it shows up in everyday life.
                      You’ll discover the difference between empathy and compassion and
                      understand how small acts of kindness can make a big impact.
                    </p>
                    <p>
                      Why It Matters: Compassion is a powerful tool for creating positive
                      change in yourself and your community. By understanding and practicing
                      compassion, you can build stronger, more meaningful relationships and
                      contribute to a kinder world.
                    </p>
                  </li>

                  {/* Week 2 */}
                  <li>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                      <img src={dot} />
                      <p style={{ fontSize: "15px", color: "#275DAD" }}>
                        Week 2: Self-Compassion
                      </p>
                    </div>
                    <p style={{ paddingLeft: ".5rem" }}>
                      What We’ll Do: This week focuses on turning compassion inward. You’ll
                      learn what it means to be kind to yourself, especially during difficult
                      times. Through guided exercises, you’ll practice self-compassion and
                      discover how it supports emotional resilience.
                    </p>
                    <p>
                      Why It Matters: Self-compassion helps you navigate challenges with
                      kindness and understanding. It’s an essential skill for maintaining
                      your well-being and fostering a positive relationship with yourself.
                    </p>
                  </li>

                  {/* Week 3 */}
                  <li>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                      <img src={dot} />
                      <p style={{ fontSize: "15px", color: "#275DAD" }}>
                        Week 3: Compassion for Others
                      </p>
                    </div>
                    <p style={{ paddingLeft: ".5rem" }}>
                      What We’ll Do: This week, we’ll focus on showing compassion toward
                      others. You’ll learn practical ways to recognize when someone needs
                      support and how to respond in a compassionate and meaningful way.
                    </p>
                    <p>
                      Why It Matters: Practicing compassion for others strengthens your
                      connections and builds trust. It fosters a sense of belonging and
                      community, creating a supportive environment for everyone.
                    </p>
                  </li>

                  {/* Week 4 */}
                  <li>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                      <img src={dot} />
                      <p style={{ fontSize: "15px", color: "#275DAD" }}>
                        Week 4: Circle of Concern
                      </p>
                    </div>
                    <p style={{ paddingLeft: ".5rem" }}>
                      What We’ll Do: This week introduces the concept of the Circle of Concern.
                      You’ll identify the people in your immediate and extended circles and learn
                      how to show compassion at different levels. We’ll also discuss the importance
                      of setting healthy boundaries in relationships.
                    </p>
                    <p>
                      Why It Matters: Understanding your Circle of Concern helps you prioritize
                      where to focus your energy and attention, ensuring you care for yourself
                      while extending kindness to others.
                    </p>
                  </li>

                  {/* Week 5 */}
                  <li>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                      <img src={dot} />
                      <p style={{ fontSize: "15px", color: "#275DAD" }}>
                        Week 5: Life Scenarios – Let’s Wear the Shoes of Others
                      </p>
                    </div>
                    <p style={{ paddingLeft: ".5rem" }}>
                      What We’ll Do: In our final week, we’ll put everything into practice.
                      Through real-life scenarios, you’ll learn to step into someone else’s
                      shoes and understand their perspective. This activity will deepen your
                      empathy and show how to apply compassion in everyday situations.
                    </p>
                    <p>
                      Why It Matters: Seeing the world through someone else’s eyes builds
                      empathy and strengthens your ability to act compassionately. These
                      skills will help you navigate social situations with understanding
                      and care.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {course?.title === "Transition" && (
        <div>
          <div
            className="py-2 px-4 course-objectives"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            {/* Header */}
            <div
              className="course-info-modal-header"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <h2 className="mb-0" style={{ fontSize: "36px" }}>
                {course?.title}
              </h2>
              <button
                className="close-btn"
                onClick={closeModal}
                style={{ border: "none", background: "none", cursor: "pointer" }}
              >
                <Icon width={24} icon="mingcute:close-fill" />
              </button>
            </div>

            <hr className="w-100 h-auto mb-2 " />

            {/* Banner */}
            <div>
              <img
                style={{ width: "100%", height: "160px", objectFit: "cover" }}
                alt=""
                src={course.banner}
              />
            </div>

            {/* Body */}
            <div className="course-info-modal-body">
              <p style={{ fontSize: "20px", color: "#275DAD" }}>Course Overview</p>
              <p style={{ paddingLeft: ".5rem" }}>
                Welcome to the Transition Curriculum! This course is designed to guide
                you through the exciting journey of moving from primary school to
                secondary school. Over the next ten weeks, we’ll explore important
                concepts to help you build confidence, develop skills, and embrace the
                opportunities ahead.
              </p>
              <p style={{ paddingLeft: ".5rem", marginTop: "1rem" }}>
                Here’s what you can look forward to:
              </p>

              <div className="mt-4">
                <p style={{ fontSize: "20px", color: "#275DAD" }}>Course Objectives</p>
                <ul>
                  {/* Week 1 */}
                  <li>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem", paddingTop: ".5rem" }}>
                      <img src={dot} />
                      <p style={{ fontSize: "15px", color: "#275DAD" }}>
                        Week 1: Introduction to Transition
                      </p>
                    </div>
                    <p style={{ paddingLeft: ".5rem" }}>
                      What We’ll Do: We’ll begin by celebrating your transition to
                      secondary school. You’ll reflect on your experiences in primary
                      school and explore “Your Why” – why secondary education is
                      important for your future.
                    </p>
                    <p style={{ paddingLeft: ".5rem", paddingTop: ".5rem" }}>
                      Why It Matters: Understanding your purpose for this new chapter
                      sets the stage for success. By identifying your goals and
                      aspirations, you’ll feel more motivated and prepared to embrace
                      secondary school.
                    </p>
                  </li>

                  {/* Week 2 */}
                  <li>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem", paddingTop: ".5rem" }}>
                      <img src={dot} />
                      <p style={{ fontSize: "15px", color: "#275DAD" }}>
                        Week 2: Growth and Fixed Mindset
                      </p>
                    </div>
                    <p style={{ paddingLeft: ".5rem" }}>
                      What We’ll Do: This week, we’ll dive into the concept of mindset.
                      You’ll learn the difference between a growth mindset and a fixed
                      mindset, and practice strategies to adopt a growth mindset when
                      facing challenges.
                    </p>
                    <p style={{ paddingLeft: ".5rem", paddingTop: ".5rem" }}>
                      Why It Matters: A growth mindset helps you believe in your ability
                      to improve and succeed. It’s a vital skill for overcoming obstacles
                      and reaching your full potential.
                    </p>
                  </li>

                  {/* Week 3 */}
                  <li>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem", paddingTop: ".5rem" }}>
                      <img src={dot} />
                      <p style={{ fontSize: "15px", color: "#275DAD" }}>
                        Week 3: Understanding What is in Your Control
                      </p>
                    </div>
                    <p style={{ paddingLeft: ".5rem" }}>
                      What We’ll Do: We’ll explore the idea of control—what aspects of
                      your life you can influence and what lies outside your control.
                      Through interactive exercises, you’ll focus on where you can make
                      a difference, and how to focus on it.
                    </p>
                    <p style={{ paddingLeft: ".5rem", paddingTop: ".5rem" }}>
                      Why It Matters: By understanding and focusing on what you can
                      control, you’ll feel more empowered and less stressed. It’s a
                      valuable tool for managing your energy and efforts effectively.
                    </p>
                  </li>

                  {/* Week 4 */}
                  <li>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem", paddingTop: ".5rem" }}>
                      <img src={dot} />
                      <p style={{ fontSize: "15px", color: "#275DAD" }}>
                        Week 4: Understanding Values
                      </p>
                    </div>
                    <p style={{ paddingLeft: ".5rem" }}>
                      What We’ll Do: This week, we’ll discuss values—what they are, why
                      they matter, and how they influence your decisions. You’ll identify
                      your personal values through engaging activities.
                    </p>
                    <p style={{ paddingLeft: ".5rem", paddingTop: ".5rem" }}>
                      Why It Matters: Knowing your values helps you make choices that
                      align with who you are and what’s important to you. It’s a
                      foundation for living with integrity and confidence.
                    </p>
                  </li>

                  {/* Week 5 */}
                  <li>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem", paddingTop: ".5rem" }}>
                      <img src={dot} />
                      <p style={{ fontSize: "15px", color: "#275DAD" }}>
                        Week 5: Core Values and How They Matter
                      </p>
                    </div>
                    <p style={{ paddingLeft: ".5rem" }}>
                      What We’ll Do: Building on last week, we’ll delve deeper into core
                      values. You’ll explore how they guide your actions, relationships,
                      and goals, and understand how they contribute to your overall
                      well-being.
                    </p>
                    <p style={{ paddingLeft: ".5rem", paddingTop: ".5rem" }}>
                      Why It Matters: Recognizing and living by your core values fosters
                      a sense of purpose and direction. It helps you stay true to
                      yourself, even in challenging situations.
                    </p>
                  </li>

                  {/* Week 6 */}
                  <li>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem", paddingTop: ".5rem" }}>
                      <img src={dot} />
                      <p style={{ fontSize: "15px", color: "#275DAD" }}>
                        Week 6: Social Skills (Navigating Relationships)
                      </p>
                    </div>
                    <p style={{ paddingLeft: ".5rem" }}>
                      What We’ll Do: We’ll focus on building and maintaining healthy
                      relationships. You’ll learn practical social skills like active
                      listening, empathy, and effective communication.
                    </p>
                    <p style={{ paddingLeft: ".5rem", paddingTop: ".5rem" }}>
                      Why It Matters: Strong social skills are essential for creating
                      meaningful connections and resolving conflicts. They’ll help you
                      navigate the social dynamics of secondary school with confidence.
                    </p>
                  </li>

                  {/* Week 7 */}
                  <li>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem", paddingTop: ".5rem" }}>
                      <img src={dot} />
                      <p style={{ fontSize: "15px", color: "#275DAD" }}>
                        Week 7: Time Management
                      </p>
                    </div>
                    <p style={{ paddingLeft: ".5rem" }}>
                      What We’ll Do: This week, we’ll explore strategies for managing
                      your time effectively. You’ll learn how to prioritize tasks, set
                      schedules, and balance schoolwork with other activities.
                    </p>
                    <p style={{ paddingLeft: ".5rem", paddingTop: ".5rem" }}>
                      Why It Matters: Time management is key to staying organized and
                      reducing stress. By managing your time well, you’ll feel more in
                      control and achieve your goals more efficiently.
                    </p>
                  </li>

                  {/* Week 8 */}
                  <li>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem", paddingTop: ".5rem" }}>
                      <img src={dot} />
                      <p style={{ fontSize: "15px", color: "#275DAD" }}>
                        Week 8: Goal Setting
                      </p>
                    </div>
                    <p style={{ paddingLeft: ".5rem" }}>
                      What We’ll Do: We’ll guide you through the process of setting
                      meaningful and achievable goals. You’ll practice breaking down big
                      goals into smaller, manageable steps.
                    </p>
                    <p style={{ paddingLeft: ".5rem", paddingTop: ".5rem" }}>
                      Why It Matters: Goal setting gives you a clear sense of direction
                      and purpose. It motivates you to take action and track your
                      progress toward success.
                    </p>
                  </li>

                  {/* Week 9 */}
                  <li>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem", paddingTop: ".5rem" }}>
                      <img src={dot} />
                      <p style={{ fontSize: "15px", color: "#275DAD" }}>
                        Week 9: Resilience and Introduction to Coping Skills
                      </p>
                    </div>
                    <p style={{ paddingLeft: ".5rem" }}>
                      What We’ll Do: This week, we’ll introduce the concept of resilience
                      and discuss coping skills to handle challenges effectively. You’ll
                      learn how to bounce back from setbacks and manage stress in healthy
                      ways.
                    </p>
                    <p style={{ paddingLeft: ".5rem", paddingTop: ".5rem" }}>
                      Why It Matters: Resilience is your ability to adapt and thrive,
                      even in tough situations. Developing coping skills helps you stay
                      strong and maintain a positive outlook.
                    </p>
                  </li>

                  {/* Week 10 */}
                  <li>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem", paddingTop: ".5rem" }}>
                      <img src={dot} />
                      <p style={{ fontSize: "15px", color: "#275DAD" }}>
                        Week 10: Looking Ahead
                      </p>
                    </div>
                    <p style={{ paddingLeft: ".5rem" }}>
                      What We’ll Do: In our final week, we’ll look toward the future.
                      You’ll reflect on what you’ve learned, set intentions for secondary
                      school, and create a plan to stay motivated and focused.
                    </p>
                    <p style={{ paddingLeft: ".5rem", paddingTop: ".5rem" }}>
                      Why It Matters: Preparing for what lies ahead ensures a smooth
                      transition and sets the tone for success in secondary school. It’s
                      an opportunity to celebrate your growth and embrace the exciting
                      journey to come.
                    </p>
                  </li>
                </ul>
              </div>

              {/* Conclusion */}
              <div className="mt-4">
                <p style={{ fontSize: "20px", color: "#275DAD" }}>Conclusion</p>
                <p style={{ paddingLeft: ".5rem" }}>
                  Remember, transition is an ongoing process. The lessons you’ve learned
                  in this course will continue to guide you as you navigate new challenges
                  and opportunities. Stay curious, keep growing, and never stop believing
                  in yourself. Good luck on your journey ahead, and always strive to be
                  your best self!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {
        course?.title === "Self-Awareness" && (
          <div>
            <div
              className="py-2 px-4 course-objectives"
              style={{
                maxHeight: "500px",
                overflowY: "auto"
              }}
            >
              <div
                className="course-info-modal-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <h2
                  className="mb-0"
                  style={{
                    fontSize: "36px"
                  }}
                >
                  {course?.title}
                </h2>
                <button
                  className="close-btn"
                  onClick={closeModal}
                  style={{ border: "none", background: "none", cursor: "pointer" }}
                >
                  <Icon width={24} icon="mingcute:close-fill" />
                </button>
              </div>
              <hr className="w-100 h-auto mb-2 " />
              <div>
                <img
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover"
                  }}
                  alt=""
                  src={course.banner}
                />
              </div>

              <div className="course-info-modal-body">
                <p style={{ fontSize: "20px", color: "#275DAD" }}>Course Overview</p>
                <p style={{ paddingLeft: ".5rem" }}>
                  Welcome to your journey of self-awareness and personal growth! Over
                  the next several weeks, we’ll explore key concepts that will help
                  you understand yourself better, and build meaningful relationships.
                  Here’s what you can look forward to:
                </p>
                <div className="mt-4">
                  <p style={{ fontSize: "20px", color: "#275DAD" }}>
                    Course Objectives
                  </p>
                  <div>
                    <ul>
                      <li>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".5rem"
                          }}
                          className=" list"
                        >
                          <img src={dot} />
                          <p style={{ fontSize: "15px", color: "#275DAD" }}>
                            Week 1: Introduction to Self-Awareness
                          </p>
                        </div>
                        <p style={{ paddingLeft: ".5rem" }}>
                          What We’ll Do: We’ll start by exploring what it means to be
                          self-aware. You’ll take a personality test to discover your
                          unique traits and identify whether you align with the colors
                          blue, green, red, or yellow. This will set the foundation
                          for understanding how your personality influences your
                          behavior.
                        </p>
                        <br />
                        <p>
                          Why It Matters: Knowing yourself is the first step in
                          personal growth. Understanding your personality will help
                          you be self-aware better.
                        </p>
                      </li>

                      <li>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".5rem"
                          }}
                          className=" list"
                        >
                          <img src={dot} />
                          <p style={{ fontSize: "15px", color: "#275DAD" }}>
                            Week 2: Identifying Strengths And Weaknesses
                          </p>
                        </div>
                        <p style={{ paddingLeft: ".5rem" }}>
                          We’ll focus on identifying your personal strengths and
                          weaknesses through scenario-based activities.
                        </p>
                      </li>

                      <li>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".5rem"
                          }}
                          className=" list"
                        >
                          <img src={dot} />
                          <p style={{ fontSize: "15px", color: "#275DAD" }}>
                            Week 3: Understanding Values
                          </p>
                        </div>
                        <p style={{ paddingLeft: ".5rem" }}>
                          We’ll dive into the importance of values, how they guide
                          your decisions, and how to identify your core values.
                        </p>
                      </li>

                      <li>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".5rem"
                          }}
                          className=" list"
                        >
                          <img src={dot} />
                          <p style={{ fontSize: "15px", color: "#275DAD" }}>
                            Week 4: Embracing A Growth Mindset
                          </p>
                        </div>
                        <p style={{ paddingLeft: ".5rem" }}>
                          We’ll explore the concept of a growth mindset and how to
                          shift from a fixed mindset to a growth mindset.
                        </p>
                      </li>

                      <li>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".5rem"
                          }}
                          className=" list"
                        >
                          <img src={dot} />
                          <p style={{ fontSize: "15px", color: "#275DAD" }}>
                            Week 5: Emotional Intelligence
                          </p>
                        </div>
                        <p
                          style={{
                            paddingLeft: ".5rem",
                            paddingBottom: "1rem"
                          }}
                        >
                          We’ll learn about emotional intelligence and how to manage
                          your emotions as well as recognize the emotions of others.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }

    </div>
  )
}
