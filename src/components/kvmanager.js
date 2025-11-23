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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Delete, Refresh } from '@mui/icons-material';

export default function KVManager() {
  const [password, setPassword] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('kvPassword') || '';
    }
    return '';
  });
  const [kvData, setKvData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // 新增键值对的表单
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  
  // 查询单个键值对
  const [searchKey, setSearchKey] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  
  // 删除确认对话框
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState('');

  // 组件挂载时,如果有保存的密码就自动获取数据
  React.useEffect(() => {
    if (password) {
      fetchAllKV();
    }
  }, []); // 仅在组件挂载时执行一次

  const fetchAllKV = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://api.vercel.aldyh.top/kv?password=${password}`, {
        cache: 'no-cache'
      });
      const data = await response.json();
      if (response.ok) {
        setKvData(data.data || []);
        // 如果请求成功,说明密码正确,保存密码
        if (typeof window !== 'undefined') {
          localStorage.setItem('kvPassword', password);
        }
      } else {
        setError(data.message || '获取数据失败');
        if (typeof window !== 'undefined') {
          localStorage.removeItem('kvPassword');
        }
      }
    } catch (err) {
      setError('网络错误');
    } finally {
      setLoading(false);
    }
  };

  const handleAddKV = async () => {
    if (!newKey || !newValue) {
      setError('键名和值不能为空');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://api.vercel.aldyh.top/kv/${encodeURIComponent(newKey)}?password=${password}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: newValue })
      });
      const data = await response.json();
      if (response.ok) {
        setNewKey('');
        setNewValue('');
        fetchAllKV();
      } else {
        setError(data.message || '添加失败');
      }
    } catch (err) {
      setError('网络错误');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchKV = async () => {
    if (!searchKey) {
      setError('请输入要查询的键名');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://api.vercel.aldyh.top/kv/${encodeURIComponent(searchKey)}?password=${password}`, {
        cache: 'no-cache'
      });
      const data = await response.json();
      if (response.ok) {
        setSearchResult(data);
      } else {
        setError(data.message || '查询失败');
        setSearchResult(null);
      }
    } catch (err) {
      setError('网络错误');
      setSearchResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteKV = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://api.vercel.aldyh.top/kv/${encodeURIComponent(keyToDelete)}?password=${password}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        setDeleteDialogOpen(false);
        setKeyToDelete('');
        fetchAllKV();
        if (searchResult && searchResult.key === keyToDelete) {
          setSearchResult(null);
        }
      } else {
        setError(data.message || '删除失败');
      }
    } catch (err) {
      setError('网络错误');
    } finally {
      setLoading(false);
    }
  };

  const openDeleteDialog = (key) => {
    setKeyToDelete(key);
    setDeleteDialogOpen(true);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        KV 数据库管理
      </Typography>

      {/* 密码输入框 - 只在没有数据时显示 */}
      {!kvData.length && (
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
              onClick={fetchAllKV}
              disabled={!password || loading}
            >
              连接
            </Button>
          </Box>
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </Paper>
      )}

      {loading && !kvData.length ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : kvData.length > 0 && (
        <>
          {/* 新增键值对 */}
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              新增键值对
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
              <TextField
                label="键名"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                size="small"
                fullWidth
              />
              <TextField
                label="值"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                size="small"
                fullWidth
              />
              <Button 
                variant="contained" 
                onClick={handleAddKV}
                disabled={loading}
              >
                添加
              </Button>
            </Box>
          </Paper>

          {/* 查询键值对 */}
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              查询键值对
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
              <TextField
                label="键名"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                size="small"
                fullWidth
              />
              <Button 
                variant="contained" 
                onClick={handleSearchKV}
                disabled={loading}
              >
                查询
              </Button>
            </Box>
            {searchResult && (
              <Paper sx={{ p: 2, mt: 2, bgcolor: 'grey.50' }}>
                <Typography variant="body2" color="text.secondary">
                  键: {searchResult.key}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, wordBreak: 'break-all' }}>
                  值: {searchResult.value}
                </Typography>
              </Paper>
            )}
          </Paper>

          {/* 所有键值对列表 */}
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6">
                所有键值对
              </Typography>
              <IconButton onClick={fetchAllKV} disabled={loading}>
                <Refresh />
              </IconButton>
            </Box>
            {error && (
              <Typography color="error" sx={{ mb: 1 }}>
                {error}
              </Typography>
            )}
            <List>
              {kvData.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        onClick={() => openDeleteDialog(item.key)}
                        disabled={loading}
                      >
                        <Delete />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={item.key}
                      secondary={
                        <Typography 
                          component="span" 
                          variant="body2" 
                          sx={{ 
                            wordBreak: 'break-all',
                            display: 'block',
                            mt: 0.5
                          }}
                        >
                          {item.value}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < kvData.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </>
      )}

      {/* 删除确认对话框 */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          <Typography>
            确定要删除键 "{keyToDelete}" 吗?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>取消</Button>
          <Button onClick={handleDeleteKV} color="error" disabled={loading}>
            删除
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
