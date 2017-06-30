//
//  DynamicButtonCell.m
//  SuperDemo
//
//  Created by Rany on 2017/6/30.
//  Copyright © 2017年 Rany. All rights reserved.
//

#define kButtonWidth 70.0f
#define kButtonHeight 30.0f
#define kButtonSpacing 10.0f

#import "DynamicButtonCell.h"

@interface DynamicButtonCell()

@property(nonatomic, strong) NSMutableArray  *buttonArray;

@end

@implementation DynamicButtonCell

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier {
    if (self = [super initWithStyle:style reuseIdentifier:reuseIdentifier]) {
        
        [self setupButtons];
        
    }
    return self;
}

-(NSMutableArray *)buttonArray
{
    if (!_buttonArray) {
        
        _buttonArray = [NSMutableArray array];
        
    }
    
    return _buttonArray;
}


- (void)setButtonFrameWithTitleArray:(NSArray *)titleArray
{
    if (titleArray.count>0) {
        
        [titleArray enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
           
            UIButton *button = self.buttonArray[idx];
            
            button.frame = CGRectMake((SCREEN_WIDTH-kButtonWidth-kButtonSpacing)-(idx*(kButtonWidth+kButtonSpacing)), 0, kButtonWidth, kButtonHeight);
            
            button.centerY = self.contentView.centerY;
            
            [button setTitle:obj forState:UIControlStateNormal];
            
            [self.contentView addSubview:button];

            
        }];
        
    }
}

/**
 创建button
 */
- (void)setupButtons
{
    for (NSInteger i = 0; i<4; i++) {
        
        UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
        
        button.backgroundColor = [UIColor redColor];
        
        [self.buttonArray addObject:button];
    }
}

@end
