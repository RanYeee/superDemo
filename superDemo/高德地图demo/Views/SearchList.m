//
//  SearchList.m
//  SuperDemo
//
//  Created by Rany on 16/8/18.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "SearchList.h"


@interface SearchList()<UITableViewDelegate,UITableViewDataSource>

@property (nonatomic, strong) UITableView *tableView;

@end

@implementation SearchList

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    
    if (self) {

        self.frame = frame;
        
        self.backgroundColor = [UIColor clearColor];
        
        self.tableView = [[UITableView alloc]initWithFrame:CGRectMake(0, 0, frame.size.width, 0) style:UITableViewStylePlain];
        
        self.tableView.delegate = self;
        
        self.tableView.dataSource = self;
        
        [self addSubview:self.tableView];

        self.hidden = YES;
        
        
    }
    
    return self;
}


#pragma mark - tabelView delegate & dataSource



-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    
    return _resultArray.count;
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    
    static NSString *cellId = @"cellId";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellId];
    
    if (!cell) {
        
        cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleValue1 reuseIdentifier:cellId];
    }
    
    if (_resultArray.count > 0) {
        
        AMapTip *tip = _resultArray[indexPath.row];
        cell.textLabel.text = tip.name;
    }
    
    return cell;
}


-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
    
}

- (void)show
{


    [UIView animateWithDuration:0.3 animations:^{
       
        self.hidden = NO;

        CGRect tableRect = self.tableView.frame;
        
        tableRect.size.height = self.frame.size.height;
        
        self.tableView.frame = tableRect;
        
        
    }];
}

- (void)hide
{

    
    [UIView animateWithDuration:0.3 animations:^{
        
        CGRect tableRect = self.tableView.frame;
        
        tableRect.size.height = 0;
        
        self.tableView.frame = tableRect;
        
    } completion:^(BOOL finished) {
        
        self.hidden = YES;

    }];
    
 
}

#pragma mark - setter

-(void)setResultArray:(NSArray *)resultArray
{
    _resultArray = resultArray;
    
    NSLog(@">>>>>>> %@",resultArray);
    
    [self.tableView reloadData];
}

@end
