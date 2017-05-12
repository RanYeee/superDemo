//
//  RNZoomView.m
//  SuperDemo
//
//  Created by Rany on 2017/5/8.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import "RNZoomView.h"

@interface RNZoomView()
{
    BOOL _isMoving;
    
    BOOL _isSmaller;//是否是窗口模式

}

@property (strong, nonatomic) UIView *contentView;

@property(nonatomic, strong) UIButton *zoomButton; //缩小窗口按钮

@property(nonatomic, strong) UITapGestureRecognizer *tapGesture;//点击事件
@end

@implementation RNZoomView


- (instancetype)init
{
    self = [super init];
    if (self) {
        
        self.frame = CGRectMake(0, SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT);
 
        [self setupUI];
    }
    return self;
}

#pragma mark - 懒加载
-(UITapGestureRecognizer *)tapGesture
{
    if (!_tapGesture) {
        
        _tapGesture = [[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(blowUpVideoView)];
    }
    
    return _tapGesture;
}


#pragma mark - UI

- (void)setupUI
{
    
    //contentView
    self.backgroundColor = [UIColor clearColor];
    
    _contentView = [[UIView alloc]initWithFrame:self.bounds];
    
    [self insertSubview:_contentView atIndex:0];
    
    _contentView.backgroundColor = [UIColor blackColor];
    
    //缩小窗口按钮
    
    _zoomButton = [UIButton buttonWithType:UIButtonTypeCustom];
    
    _zoomButton.frame = CGRectMake(20, 20, 40, 40);
    
//    _zoomButton.backgroundColor = [UIColor purpleColor];
    
    [_zoomButton setImage:IMAGE(@"缩屏") forState:UIControlStateNormal];
    
    [_zoomButton addTarget:self action:@selector(smallerAction:) forControlEvents:UIControlEventTouchUpInside];
    
    [_contentView addSubview:_zoomButton];
    
    //点击手势
    self.userInteractionEnabled = YES;
    
    [self addGestureRecognizer:self.tapGesture];

}

//缩小窗口按钮
- (void)smallerAction:(id)sender {
    
    
    [self contractVideoChatView];
    
}

//展开视图
-(void)show
{
    [[UIApplication sharedApplication].keyWindow addSubview:self];
    
    [UIView animateWithDuration:0.35 animations:^{
        
        self.frame = CGRectMake(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        
        [self layoutIfNeeded];
        
    }];
    
}

//放大
- (void)blowUpVideoView
{
//    self.userInteractionEnabled = NO;

    [UIView animateWithDuration:0.35 animations:^{
        CGRect blowUpRect = CGRectMake(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        
        self.frame = blowUpRect;
        
        _contentView.frame = blowUpRect;

        [self layoutIfNeeded];
        
    }completion:^(BOOL finished) {

        _zoomButton.hidden = NO;
        
        _isSmaller = NO;

    }];
    
}

//缩小
-(void)contractVideoChatView
{
    
    [UIView animateWithDuration:0.6 animations:^{
      
        CGRect smallRect = CGRectMake(0, 0, SCREEN_WIDTH/3, SCREEN_HEIGHT/4);
        self.frame = smallRect;

        _contentView.frame = smallRect;
        _zoomButton.hidden = YES;
        
    }completion:^(BOOL finished) {
        
//        self.userInteractionEnabled = YES;
        _isSmaller = YES;
    }];
}


#pragma mark - 拖动视图控制方法

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event{
    [super touchesBegan:touches withEvent:event];
    
    UITouch *touch = [touches anyObject];
    
    CGPoint point = [touch locationInView:self];
    
    CALayer *touchedLayer = [self.layer hitTest:point];
    
    if(touchedLayer == self.layer){
        _isMoving = YES;
    }
}

- (void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event{
    [super touchesMoved:touches withEvent:event];
    
    //    if(!_isMoving){
    //        return;
    //    }
    
    //如果不是窗口状态则不不给拖动
    if (!_isSmaller) {
        
        return;
    }
    
    UITouch *touch = [touches anyObject];
    
    CGPoint current = [touch locationInView:self];
    CGPoint previous = [touch previousLocationInView:self];
    
    CGPoint center = self.center;
    
    CGPoint offset = CGPointMake(current.x - previous.x, current.y - previous.y);
    
    CGPoint viewCenter =  CGPointMake(center.x + offset.x, center.y + offset.y);

    
    if (viewCenter.x<SCREEN_WIDTH/6 || (SCREEN_WIDTH-viewCenter.x)<SCREEN_WIDTH/6 || viewCenter.y<SCREEN_HEIGHT/8 || SCREEN_HEIGHT-viewCenter.y<SCREEN_HEIGHT/8){
        
        return;
        
    }else{
        
        self.center = viewCenter;
    }

}

- (void)touchesEnded:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event{
    [super touchesEnded:touches withEvent:event];
  
    
    NSLog(@"currentPoint = %@",NSStringFromCGPoint(self.center));
}

@end
