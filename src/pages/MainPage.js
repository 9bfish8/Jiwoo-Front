import React, { useEffect, useRef, useState } from 'react';
import {Box, Text, Flex, Image, IconButton, HStack, VStack, Button} from '@chakra-ui/react';
import {ChevronRightIcon, ChevronLeftIcon, ChatIcon} from '@chakra-ui/icons';
import MainHeader from '../component/common/MainHeader';
import MarketResearch from "./MarketResearch";
import BusinessModel from "./BusinessModel";
import SideNavigation from "../component/SideNavigation";
import Footer from "../component/common/Footer";
import Accounting from "./Accounting";
import {navigate} from "@storybook/addon-links";
import {useNavigate} from "react-router-dom";

function MainPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const marketResearchRef = useRef(null);
    const businessModelRef = useRef(null);
    const accountingRef = useRef(null); // 새로 추가
    const [activeSection, setActiveSection] = useState('marketSize');
    const navigate = useNavigate();



    const navigateToChatPage = () => {
        navigate('/chatbot');
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        if (marketResearchRef.current && businessModelRef.current) {
            const handleScroll = () => {
                const scrollPosition = window.scrollY;
                if (scrollPosition < businessModelRef.current.offsetTop) {
                    setActiveSection('marketResearchRef');
                } else if (scrollPosition < accountingRef.current.offsetTop) {
                    setActiveSection('businessModelRef');
                } else {
                    setActiveSection('accountingRef');
                }
            };

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [marketResearchRef, businessModelRef, accountingRef]);

    const scrollToSection = (sectionName) => {
        const refMap = {
            marketSize: marketResearchRef,
            similarServices: businessModelRef,
            accounting: accountingRef,
        };
        if (refMap[sectionName]?.current) {
            refMap[sectionName].current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const features = [
        { title: "창업 가이드", description: "AI 기반 맞춤형 창업 전략", icon: "/path/to/icon1.png" },
        { title: "비즈니스 모델", description: "혁신적인 비즈니스 모델 설계", icon: "/path/to/icon2.png" },
        { title: "세무 처리", description: "간편한 세무 관리 솔루션", icon: "/path/to/icon3.png" },
        { title: "시장 조사", description: "AI 기반 시장 트렌드 분석", icon: "/path/to/icon4.png" },
    ];

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % features.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000); // 5초마다 자동 슬라이드

        return () => clearInterval(timer);
    }, []);

    const scrollToMarketResearch = () => {
        marketResearchRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToBusinessModel = () => {
        businessModelRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToAccounting = () => {
        accountingRef.current?.scrollIntoView({ behavior: 'smooth' });
    };


    return (
        <Box>
            <MainHeader
                scrollToMarketResearch={scrollToMarketResearch}
                scrollToBusinessModel={scrollToBusinessModel}
                scrollToAccounting={scrollToAccounting}

            />
            <Box
                bg="#010B1A"
                color="white"
                height="100vh"
                position="relative"
                overflow="hidden"
            >
                <Flex height="100%" pl="10%" pr="5%" pt="10%" position="relative">
                    <VStack align="flex-start" width="40%" mr="10%">
                        <Text fontSize="6xl" fontWeight="bold" mb={4}>
                            JIWOO AI HELPER
                        </Text>
                        <Text fontSize="xl" mb={16}>
                            1인 IT 창업을 위한 최고의 AI 파트너<br />
                            혁신적인 기술로 당신의 창업 여정을 가속화합니다
                        </Text>
                    </VStack>

                    <Flex position="relative" width="50%" height="400px" alignItems="flex-end">
                        {features.map((feature, index) => (
                            <Box
                                key={index}
                                bg={index === currentSlide ? "white" : "rgba(255,255,255,0.1)"}
                                color={index === currentSlide ? "black" : "white"}
                                p={8}
                                mr={index === currentSlide ? 0 : "-80%"}
                                width={index === currentSlide ? "100%" : "20%"}
                                height={index === currentSlide ? "100%" : "80%"}
                                borderRadius="2xl"
                                cursor="pointer"
                                onClick={() => setCurrentSlide(index)}
                                transition="all 0.5s"
                                zIndex={features.length - index}
                                position="absolute"
                                right="0"
                                bottom="0"
                            >
                                <VStack align="flex-start" height="100%" justify="space-between">
                                    <Box>
                                        <Text fontWeight="bold" fontSize="2xl" mb={4}>{feature.title}</Text>
                                        <Text fontSize="md">{feature.description}</Text>
                                    </Box>
                                    <Flex justify="space-between" align="center" width="100%">
                                        <Image src={feature.icon} boxSize="40px" />
                                        <ChevronRightIcon boxSize={8} />
                                    </Flex>
                                </VStack>
                            </Box>
                        ))}
                    </Flex>
                </Flex>

                <Button
                    position="fixed"
                    bottom="20px"
                    right="20px"
                    colorScheme="blue"
                    onClick={navigateToChatPage}
                    zIndex={1000}
                    borderRadius="full"
                    width="60px"
                    height="60px"
                    boxShadow="lg"
                    _hover={{ transform: 'scale(1.05)' }}
                    transition="all 0.2s"
                >
                    <ChatIcon boxSize={6} />
                </Button>

            </Box>

            <SideNavigation activeSection={activeSection} scrollToSection={scrollToSection} />


            <Box ref={marketResearchRef}>
                <MarketResearch />
            </Box>

            <Box ref={businessModelRef}>
                <BusinessModel />
            </Box>

            <Box ref={accountingRef}>
                <Accounting />
            </Box>

            <Footer/>
        </Box>
    );
}

export default MainPage;
