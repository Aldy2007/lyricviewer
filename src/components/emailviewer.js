'use client';
import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  CircularProgress,
  IconButton
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

export default function EmailViewer() {
  const [password, setPassword] = useState(() => {
    if (typeof window !== 'undefined') {
      
      return localStorage.getItem('emailPassword') || '';
    }
    return '';
  });
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 组件挂载时，如果有保存的密码就自动获取邮件
  React.useEffect(() => {
    if (password) {
      fetchEmails();
    }
  }, []); // 仅在组件挂载时执行一次

  const fetchEmails = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/tools/email/list?password=${password}`);
      const data = await response.json();
      if (data.status === 'success') {
        setEmails(data.emails);
        // 如果请求成功，说明密码正确，保存密码
        if (typeof window !== 'undefined') {
          localStorage.setItem('emailPassword', password);
        }
      } else {
        setError('获取邮件失败');
        if (typeof window !== 'undefined') {
          localStorage.removeItem('emailPassword');
        }
      }
    } catch (err) {
      setError('网络错误');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmailDetail = async (id) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/tools/email/detail?id=${id}&password=${password}`);
      const data = await response.json();
      if (data.status === 'success') {
        setSelectedEmail(data.message);
      } else {
        setError('获取邮件详情失败');
      }
    } catch (err) {
      setError('网络错误');
    } finally {
      setLoading(false);
    }
  };

  // 刷新邮件列表
  const refreshEmails = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/tools/email/refresh?password=${password}`);
      const data = await response.json();
      if (data.status === 'success') {
        setEmails(data.emails);
      } else {
        setError('刷新失败');
      }
    } catch (err) {
      setError('网络错误');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBack = () => {
    setSelectedEmail(null);
  };

  const renderEmailList = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <Button 
          variant="outlined" 
          size="small" 
          onClick={refreshEmails}
          disabled={loading}
        >
          刷新
        </Button>
      </Box>
      <List>
        {emails.map((email) => (
          <React.Fragment key={email['#']}>
            <ListItem 
              button 
              onClick={() => fetchEmailDetail(email['#'])}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <ListItemText
                primary={email.subject}
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" color="text.primary">
                      {email.from}
                    </Typography>
                    <br />
                    {formatDate(email.date)}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  const renderEmailDetail = () => (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={handleBack}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">返回邮件列表</Typography>
      </Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {selectedEmail.subject}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          From: {selectedEmail.from}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          To: {selectedEmail.to}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Date: {formatDate(selectedEmail.date)}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box 
          dangerouslySetInnerHTML={{ __html: selectedEmail.html }} 
          sx={{
            '& img': {
              maxWidth: '100%',
              height: 'auto'
            }
          }}
        />
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      {!emails.length && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="密码"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <Button 
              variant="contained" 
              onClick={fetchEmails}
              disabled={!password || loading}
            >
              获取邮件
            </Button>
          </Box>
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </Paper>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : selectedEmail ? (
        renderEmailDetail()
      ) : (
        emails.length > 0 && renderEmailList()
      )}
    </Box>
  );
}
