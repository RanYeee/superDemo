//
//  RNInputHistoryListView.m
//  SuperDemo
//
//  Created by Rany on 2017/7/10.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import "RNInputHistoryListView.h"

@interface RNInputHistoryListView()<UITableViewDelegate,UITableViewDataSource>

@property(nonatomic, strong) UITableView *tableView;

@end

@implementation RNInputHistoryListView


- (instancetype)init
{
    self = [super init];
    if (self) {
        
        [self setupUI];
    }
    return self;
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        
        [self setupUI];
        
    }
    return self;
}


- (void)setupUI
{
    
    self.tableView = [[UITableView alloc]initWithFrame:CGRectZero style:UITableViewStylePlain];
    self.tableView.delegate = self;
    self.tableView.dataSource = self;
    [self addSubview:self.tableView];
    self.tableView.scrollEnabled = NO;
}

-(void)addBorder
{
    UIColor *borderColor = [UIColor lightGrayColor];
    
    CALayer *BottomBorder = [CALayer layer];
    BottomBorder.backgroundColor = borderColor.CGColor;
    BottomBorder.frame = CGRectMake(0, self.frame.size.height-1, self.frame.size.width, 1);
    [self.tableView.layer addSublayer:BottomBorder];
    
    CALayer *LeftBorder = [CALayer layer];
    LeftBorder.backgroundColor = borderColor.CGColor;
    LeftBorder.frame = CGRectMake(0.5, 0, 1, self.frame.size.height);
    [self.tableView.layer addSublayer:LeftBorder];
    
    CALayer *RightBorder = [CALayer layer];
    RightBorder.backgroundColor = borderColor.CGColor;
    RightBorder.frame = CGRectMake(self.frame.size.width-1, 0, 1, self.frame.size.height);
    
    [self.tableView.layer addSublayer:RightBorder];
    
    
}

- (void)layoutSubviews {
    [super layoutSubviews];
    
    self.tableView.frame = self.bounds;
    self.tableView.separatorInset = UIEdgeInsetsMake(0, -10, 0, 0);
    
    [self addBorder];
//    self.tableView.layer.borderColor = [UIColor lightGrayColor].CGColor;
//    self.tableView.layer.borderWidth = 1;
    
}

#pragma mark - setter

-(void)setInputArray:(NSArray *)inputArray
{
    _inputArray = inputArray;
    
    [self.tableView reloadData];
}

#pragma mark - tableview delegate

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.inputArray.count;
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *identifier = @"cell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:identifier];
    if (!cell) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:identifier];
        cell.textLabel.font = [UIFont systemFontOfSize:15];
    }
    
//    if (indexPath.row%2 == 0) {
//        
//        cell.contentView.backgroundColor = [UIColor lightGrayColor];
//        
//    }else{
//        
//        cell.contentView.backgroundColor = [UIColor groupTableViewBackgroundColor];
//
//    }
//    
    cell.textLabel.text = self.inputArray[indexPath.row];
    
    return cell;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return 35.0f;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    
    if (self.delegate) {
        
        [self.delegate didSelectAtIndex:indexPath.row Object:self.inputArray[indexPath.row]];
    }
    
}

@end
