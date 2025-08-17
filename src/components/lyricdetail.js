'use client';

import * as React from 'react';
import { Container, Paper, Typography, Box, Slider, Button, Grid, Select, MenuItem } from '@mui/material';

export default function LyricDetail({ lyrics, tlyrics, artist, romalyrics }) {
    // 状态管理
    const [fontSize, setFontSize] = React.useState(12); // 默认字体大小为 12pt
    const [color, setColor] = React.useState('#000000'); // 默认颜色为黑色
    const [lineHeight, setLineHeight] = React.useState(1.6); // 默认行间距为 1.6
    const [columnGap, setColumnGap] = React.useState(10); // 仅用于打印样式，可忽略
    const [showTranslation, setShowTranslation] = React.useState(true); // 默认显示翻译

    // 处理字体大小滑动框变化
    const handleFontSizeChange = (event, newValue) => {
        setFontSize(newValue);
    };

    // 处理行间距滑动框变化
    const handleLineHeightChange = (event, newValue) => {
        setLineHeight(newValue);
    };

    // 处理列间距滑动框变化
    const handleColumnGapChange = (event, newValue) => {
        setColumnGap(newValue);
    };

    // 处理颜色选择变化
    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    // 触发打印
    const handlePrint = () => {
        window.print();
    };

    // 颜色选项
    const colorOptions = [
        { value: '#000000', label: '黑色' },
        { value: '#FF0000', label: '红色' },
        { value: '#0000FF', label: '蓝色' },
        { value: '#008000', label: '绿色' },
    ];

    // 切换显示翻译或罗马音
    const handleToggleLyrics = () => {
        setShowTranslation(!showTranslation);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, '@media print': { mt: 0 } }}>
            {/* 参数调整区域 */}
            <Paper elevation={3} sx={{ mb: 3, p: 2, backgroundColor: '#fafafa', '@media print': { display: 'none' } }}>
                <Container maxWidth="sm">
                    <Grid container spacing={0} alignItems="center">
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ width: 250 }}>
                                <Typography variant="body2" gutterBottom>
                                    调整字体大小: {fontSize}pt
                                </Typography>
                                <Slider
                                    value={fontSize}
                                    onChange={handleFontSizeChange}
                                    min={5}
                                    max={20}
                                    step={1}
                                    marks
                                    valueLabelDisplay="auto"
                                    aria-labelledby="font-size-slider"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ width: 250 }}>
                                <Typography variant="body2" gutterBottom>
                                    调整行间距: {lineHeight.toFixed(1)}
                                </Typography>
                                <Slider
                                    value={lineHeight}
                                    onChange={handleLineHeightChange}
                                    min={1.0}
                                    max={3.0}
                                    step={0.1}
                                    marks
                                    valueLabelDisplay="auto"
                                    aria-labelledby="line-height-slider"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ width: 250 }}>
                                <Typography variant="body2" gutterBottom>
                                    调整列间距: {columnGap}px
                                </Typography>
                                <Slider
                                    value={columnGap}
                                    onChange={handleColumnGapChange}
                                    min={0}
                                    max={100}
                                    step={5}
                                    marks
                                    valueLabelDisplay="auto"
                                    aria-labelledby="column-gap-slider"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ width: 150 }}>
                            <Button variant="contained" onClick={handlePrint} sx={{ width: 150 }}>
                                打印歌词
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>

            {/* 按钮切换翻译和罗马音 */}
            {(tlyrics || romalyrics) && (
                <Box sx={{ textAlign: 'center', mb: 3, '@media print': { display: 'none' } }}>
                    <Button variant="outlined" onClick={handleToggleLyrics}>
                        {showTranslation ? '显示罗马音' : '显示翻译'}
                    </Button>
                </Box>
            )}

            <Paper sx={{ padding: 3, backgroundColor: '#f5f5f5', '@media print': { boxShadow: 'none', padding: 0, backgroundColor: '#fff' } }}>
                {/* 歌手信息 */}
                <Box sx={{ textAlign: 'center', mb: 3, '@media print': { display: 'none' } }}>
                    <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
                        {artist}
                    </Typography>
                </Box>

                {/* 歌词显示区域 */}
                <Box
                    sx={{
                        lineHeight: lineHeight,
                        fontSize: `${fontSize}pt`,
                        color: color,
                        '@media print': {
                            color: color,
                            fontSize: `${fontSize}pt`,
                        },
                    }}
                >
                    {/* 原始歌词 */}
                    <Box component="div" sx={{ marginBottom: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            歌词
                        </Typography>
                        <pre
                            style={{
                                margin: 0,
                                padding: 0,
                                whiteSpace: 'pre-wrap',
                                wordWrap: 'break-word',
                                fontFamily: 'inherit',
                            }}
                        >
                            {lyrics}
                        </pre>
                    </Box>

                    {/* 翻译或罗马音 */}
                    <Box component="div">
                        <Typography variant="h6" gutterBottom>
                            {showTranslation ? '翻译' : '罗马音'}
                        </Typography>
                        <pre
                            style={{
                                margin: 0,
                                padding: 0,
                                whiteSpace: 'pre-wrap',
                                wordWrap: 'break-word',
                                fontFamily: 'inherit',
                                color: showTranslation ? '#555' : '#333',
                            }}
                        >
                            {showTranslation ? tlyrics : romalyrics}
                        </pre>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}