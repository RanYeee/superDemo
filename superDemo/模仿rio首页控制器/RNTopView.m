//
//  RNTopView.m
//  SuperDemo
//
//  Created by Rany on 16/8/9.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "RNTopView.h"

#define kSelfWidth  self.bounds.size.width
#define kSelfHeight self.bounds.size.height
#define kNavigationBarHeight 60
#define kMDTabBarHeight 48
static CGFloat const kHeaderWidth = 104; // 头像宽度
static CGFloat const kHeaderHeight = 120; // 头像高度

static CGFloat const kHeaderMinWidth = 40; // 头像在顶部时的宽度
@interface RNTopView()

@property (nonatomic,strong) UIImageView *iconImageView;

@property (nonatomic,strong) UIImageView *maskImageView;

@property (nonatomic,strong) UIView *bgView;

@property (nonatomic,strong) UIButton *leftButton;




@end

@implementation RNTopView


- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        
        [self insertSubview:self.leftButton aboveSubview:self.bgView];
    }
    return self;
}




- (void)reloadWithScrollView:(UIScrollView *)scrollView
{
    
    CGFloat offsetY = scrollView.contentOffset.y + kSelfHeight - kNavigationBarHeight+20;
    
    NSLog(@"%f",offsetY);
    
    CGFloat centerX = kSelfWidth / 2;
    CGFloat centerY = (kSelfHeight + offsetY) / 2;


    if (offsetY > 0 && offsetY <kSelfHeight) {
        
        self.top = -offsetY / 2;
        
        self.bgView.backgroundColor = [UIColor colorWithRed:0.3725 green:0.702 blue:(offsetY/100) alpha:1.0];
        
        // 每移动1像素需要改变的比例
        CGFloat kEachPixel = (1 - kHeaderMinWidth / kHeaderWidth) / (kSelfHeight - kNavigationBarHeight);
        CGFloat kScale = 1 - offsetY * kEachPixel;
        self.iconImageView.transform = CGAffineTransformMakeScale(kScale, kScale);
        self.iconImageView.center = CGPointMake(centerX, centerY);
        self.iconImageView.alpha = 1-offsetY/100;
        
    }else if(offsetY >kSelfHeight){
        
        self.top = -(kSelfHeight/2);
        
        self.bgView.backgroundColor = [UIColor colorWithRed:0.3725 green:0.702 blue:1 alpha:1.0];
        
    }

}



- (UIImageView *)iconImageView
{
    if (!_iconImageView) {
        
        
        _iconImageView = [[UIImageView alloc]init];
        _iconImageView.frame = CGRectMake(0, 0, kHeaderWidth, kHeaderHeight);
        _iconImageView.center = CGPointMake(kSelfWidth / 2, kSelfHeight / 2);
        _iconImageView.clipsToBounds = YES;
        _iconImageView.contentMode = UIViewContentModeScaleAspectFit;
        _iconImageView.backgroundColor = [UIColor clearColor];
        _iconImageView.maskView = self.maskImageView;
        [self.bgView addSubview:_iconImageView];
        
    }
    
    return _iconImageView;
}

-(UIImageView *)maskImageView
{
    
    if (!_maskImageView) {
        
        _maskImageView = [[UIImageView alloc]init];
        
        _maskImageView.frame = CGRectMake(2, 15, 92, 103);
        
        _maskImageView.image = [UIImage imageNamed:@"mask"];
        
        _maskImageView.transform = CGAffineTransformRotate(_maskImageView.transform, -M_PI_4);
        
    }
    
    return _maskImageView;
}

-(UIButton *)leftButton
{
    
    if (!_leftButton) {
        
        _leftButton = [[UIButton alloc]init];
        
        [_leftButton setImage:[UIImage imageNamed:@"icon_home_more"] forState:UIControlStateNormal];
        
        _leftButton.frame = CGRectMake(15, 30, 31, 31);
        
    }
    
    return _leftButton;
}

-(UIView *)bgView
{
    
    if (!_bgView) {
        
        _bgView = [[UIView alloc]initWithFrame:CGRectMake(0, 0, kSelfWidth, kSelfHeight)];
        
        [self addSubview:_bgView];
    }
    
    return _bgView;
}

-(MDTabBar *)mdTabbar
{
    
    if (!_mdTabbar) {
        
        _mdTabbar = [[MDTabBar alloc]init];
        
        _mdTabbar.frame = CGRectMake(0, kSelfHeight-kMDTabBarHeight, SCREEN_WIDTH, kMDTabBarHeight);
        
        _mdTabbar.backgroundColor = [UIColor clearColor];
        
        _mdTabbar.indicatorColor = [UIColor whiteColor];
        
        _mdTabbar.rippleColor = [UIColor whiteColor];
        
        _mdTabbar.horizontalPaddingPerItem = 40;
                
        [self.bgView addSubview:_mdTabbar];
    }
    
    return _mdTabbar;
}

#pragma mark - setter

-(void)setIconImage:(UIImage *)iconImage
{
    
    self.iconImageView.image = iconImage;
    
}

-(void)setItems:(NSArray *)items
{
    
    [self.mdTabbar setItems:items];
}



@end
