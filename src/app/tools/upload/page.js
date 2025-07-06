'use client';
import * as React from 'react';
import { Box, Container, Button, Typography, Paper, Link, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function UploadPage() {
    const [file, setFile] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [responseData, setResponseData] = React.useState(null);
    const [copied, setCopied] = React.useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setMessage('');
        setResponseData(null);
    };

    const copyToClipboard = async () => {
        if (!responseData?.uploadFileDTO?.fileId) return;

        try {
            await navigator.clipboard.writeText(responseData.uploadFileDTO.fileId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            console.log('复制成功:', responseData.uploadFileDTO.fileId); // 调试日志
        } catch (err) {
            console.error('复制失败:', err);
            // 降级方案：使用document.execCommand
            const textArea = document.createElement('textarea');
            textArea.value = responseData.uploadFileDTO.fileId;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleUpload = async () => {
        setUploading(true);
        setMessage('');
        setResponseData(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('https://api.vercel.aldyh.top/upload', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();

            if (result.status === 1000) {
                setMessage(result.message || '上传成功');
                setResponseData(result);
            } else {
                setMessage(result.message || '上传失败');
            }
        } catch (error) {
            setMessage('上传失败: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                padding: 3,
                borderRadius: 2,
                boxShadow: 1,
                backgroundColor: 'background.paper'
            }}>
                <Typography variant="h5" align="center" gutterBottom>
                    图片上传
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        component="label"
                        variant="contained"
                        disabled={uploading}
                        sx={{ width: '200px' }}
                    >
                        选择文件
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            key={file ? file.name : 'empty'}
                        />
                    </Button>
                </Box>

                {file && (
                    <Typography align="center">已选择文件: {file.name}</Typography>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        onClick={handleUpload}
                        disabled={uploading || !file}
                        sx={{ width: '200px' }}
                    >
                        {uploading ? (
                            <>
                                <CircularProgress size={20} sx={{ mr: 1 }} />
                                上传中...
                            </>
                        ) : '上传'}
                    </Button>
                </Box>

                {message && (
                    <Typography
                        align="center"
                        color={message.includes('成功') ? 'success.main' : 'error.main'}
                    >
                        {message}
                    </Typography>
                )}

                {responseData?.uploadFileDTO?.fileId && (
                    <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            上传成功，文件地址:
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: 'action.hover',
                            p: 1,
                            borderRadius: 1
                        }}>
                            <Link
                                href={responseData.uploadFileDTO.fileId}
                                target="_blank"
                                rel="noopener"
                                sx={{ wordBreak: 'break-all' }}
                            >
                                {responseData.uploadFileDTO.fileId}
                            </Link>
                            <Button
                                size="small"
                                onClick={copyToClipboard}
                                startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
                            >
                                {copied ? '已复制' : '复制'}
                            </Button>
                        </Box>
                    </Paper>
                )}
            </Box>
        </Container>
    );
}